const { Food } = require("../models");
const { HttpStatus, Response } = require("../http");
const fs = require("fs");
const { Op } = require("sequelize");

module.exports = {
  dumpFood: async (req, res) => {
    try {
      const data = fs.readFileSync("./repositories/foods.json");
      JSON.parse(data).map(async (d) => {
        Food.create({
          name: d.food_name,
          idNumber: parseInt(d["No."]),
          isFastFood:
            d.Fast_Food === "" ? false : d.Fast_Food === "Tidak" ? false : true,
          source: d.Sumber,
          type: d.Tipe,
          jenisOlahan: d.Jenis_Olahan,
          energiKalori:
            d["Energi (Kal)"] === "" ? 0 : parseFloat(d["Energi (Kal)"]),
          protein: d["Protein (g)"] === "" ? 0 : parseFloat(d["Protein (g)"]),
          lemak: d["Lemak (g)"] === "" ? 0 : parseFloat(d["Lemak (g)"]),
          karbohidrat:
            d["Karbohidrat (g)"] === "" ? 0 : parseFloat(d["Karbohidrat (g)"]),
          images: d["Gambar"],
        });
      });

      return Response({
        res,
        status: HttpStatus.OK,
        message: "successfully dump foods data",
      });
    } catch (error) {
      console.log(error);
    }
  },

  searchFood: async (req, res) => {
    try {
      const { q } = req.query;
      const foodsMatch = await Food.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${q}%`,
          },
        },
        attributes: ["name", "images", "energiKalori"],
      });

      if (!foodsMatch.count) {
        return Response({
          res,
          status: HttpStatus.NOT_FOUND,
          message: `No food match for keyword [${q}]`,
        });
      }

      return Response({
        res,
        status: HttpStatus.OK,
        message: `Result for [${q}]`,
        data: {
          metadata: {
            keyword: q,
            resultCount: foodsMatch.count,
          },
          result: foodsMatch.rows,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getFoods: async (req, res) => {
    try {
      const { perPage } = req.query;
      const foods = await Food.findAndCountAll({
        attributes: ["name", "images", "energiKalori"],
        limit: perPage ? parseInt(perPage) : 5,
      });

      if (foods.count < 1) {
        return Response({
          res,
          status: HttpStatus.NOT_FOUND,
          message: "Foods still null",
        });
      }

      return Response({
        res,
        status: HttpStatus.OK,
        message: "Foods is found",
        data: {
          metadata: {
            dataLoaded: perPage ? parseInt(perPage) : 5,
            totalRows: foods.count,
          },
          foodsData: foods.rows,
        },
      });
    } catch (error) {
      console.log();
    }
  },

  // getFoodById: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const food = await Food.findOne({
  //       where: {
  //         id,
  //       },

  //       attributes: [""]
  //     });

  //     if (!food) {
  //       return Response({
  //         res,
  //         status: HttpStatus.NOT_FOUND,
  //         message: "Foods not found",
  //       });
  //     }

  //     return Response({
  //       res,
  //       status: HttpStatus.OK,
  //       message: "Food is found",
  //       data: food,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
