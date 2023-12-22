const { Restaurant } = require("../models");
const { HttpStatus, Response } = require("../http");
const fs = require("fs");
const { Op } = require("sequelize");
const { Menu, Food } = require("../models");

module.exports = {
  dumpRestaurant: async (req, res) => {
    try {
      const data = JSON.parse(
        fs.readFileSync("./repositories/resto_location.json", "utf-8")
      );

      for (let i = 0; i < 96; i++) {
        var mapsLink = `https://www.google.com/maps?q=${data[i]["LATITUDE"]
          .toString()
          .replace(/,/g, ".")},${data[i]["LONGITUDE"].replace(/,/g, ".")}`;
        await Restaurant.create({
          idNumber: data[i]["ID TEMPAT"],
          place: data[i]["TEMPAT"],
          address: data[i]["LOCATION"],
          location: mapsLink,
        });
      }

      return Response({
        res,
        status: HttpStatus.OK,
        message: "successfully restaurant found",
      });
    } catch (error) {
      console.log(error);
    }
  },

  getRestaurant: async (req, res) => {
    try {
      const { perPage, location } = req.query;
      if (!location) {
        return Response({
          res,
          status: HttpStatus.BAD_REQUEST,
          message: "Location cannot be null or invalid",
        });
      }

      const restaurant = await Restaurant.findAndCountAll({
        attributes: ["place", "address"],
        limit: perPage ? parseInt(perPage) : 5,
        where: {
          address: {
            [Op.like]: `%${location}%`,
          },
        },
      });

      if (restaurant.count < 1) {
        return Response({
          res,
          status: HttpStatus.NOT_FOUND,
          message: "Restaurant not found",
        });
      }

      return Response({
        res,
        status: HttpStatus.OK,
        message: "Restaurant is found",
        data: {
          metadata: {
            dataLoaded: perPage ? parseInt(perPage) : 5,
            totalRows: restaurant.count,
          },
          restaurantData: restaurant.rows,
        },
      });
    } catch (error) {
      console.log();
    }
  },

  viewDetailRestaurant: async (req, res) => {
    try {
      const { id } = req.params;
      const restaurant = await Restaurant.findOne({
        attributes: ["place", "address", "location"],
        include: [
          {
            model: Menu,
            as: "menu",
            attributes: ["menuName", "place"],
            include: [
              {
                model: Food,
                as: "food",
                attributes: ["name", "energiKalori", "images"],
              },
            ],
          },
        ],
        where: {
          id,
        },
      });

      if (!restaurant) {
        return Response({
          res,
          status: HttpStatus.NOT_FOUND,
          message: "Restaurant not found",
        });
      }

      return Response({
        res,
        status: HttpStatus.OK,
        message: "Restaurant is found",
        data: restaurant,
      });
    } catch (error) {
      console.log();
    }
  },
};
