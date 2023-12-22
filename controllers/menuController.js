const { Menu } = require("../models");
const { HttpStatus, Response } = require("../http");
const fs = require("fs");

module.exports = {
  dumpMenu: async (req, res) => {
    try {
      const data = fs.readFileSync(
        "./repositories/menu_with_location.json",
        "utf-8"
      );

      const d = JSON.parse(data).map((d) => {
        return {
          restoId: d["ID TEMPAT"],
          foodId: d["ID MAKANAN"],
          secondaryId: d["ID"],
          menuName: d["MAKAN"],
          place: d["TEMPAT"],
          address: d["Location"],
        };
      });

      await Menu.bulkCreate(d, {
        ignoreDuplicates: true,
      });

      return Response({
        res,
        status: HttpStatus.OK,
        message: "successfully location found",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
