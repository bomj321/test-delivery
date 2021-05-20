"user strict";

let validator = require("validator");
let controller = {
  update: (req, res) => {
    return res.status(200).send({
      status: "success of success",
    });

    /* let userId = req.params.userId;
    var params = req.body;

    if (params.password) {
      bcrypt.hash(params.password, null, null, (err, hash) => {
        params.password = hash;
        User.findOneAndUpdate(
          {
            _id: userId,
          },
          params,
          {
            new: true,
          },
          (err, userUpdated) => {
            if (err) {
              return res.status(500).send({
                status: "error",
                message: "Error al actualizar usuario",
              });
            }

            if (!userUpdated) {
              return res.status(500).send({
                status: "error",
                message: "No se ha actualizado el usuario",
              });
            }

            //Return response
            return res.status(200).send({
              status: "success",
              user: userUpdated,
            });
          }
        );
      }); // Close bcrypt
    } else {
      User.findOneAndUpdate(
        {
          _id: userId,
        },
        params,
        {
          new: true,
        },
        (err, userUpdated) => {
          if (err) {
            return res.status(500).send({
              status: "error",
              message: "Error al actualizar usuario",
            });
          }

          if (!userUpdated) {
            return res.status(500).send({
              status: "error",
              message: "No se ha actualizado el usuario",
            });
          }

          //Return response
          return res.status(200).send({
            status: "success",
            user: userUpdated,
          });
        }
      );
    }*/
  },

  getProducts: (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);

      // Verify pagination
      if (
        !req.params.page ||
        req.params.page == 0 ||
        req.params.page == "0" ||
        req.params.page == null ||
        req.params.page == undefined ||
        !validator.isInt(req.params.page)
      ) {
        var page = 1;
      } else {
        var page = parseInt(req.params.page);
      }

      if (
        !req.params.pageSize ||
        req.params.pageSize == 0 ||
        req.params.pageSize == "0" ||
        req.params.pageSize == null ||
        req.params.pageSize == undefined ||
        !validator.isInt(req.params.pageSize)
      ) {
        var pageSize = 1;
      } else {
        var pageSize = parseInt(req.params.pageSize);
      }

      // calculate offset
      const offset = (page - 1) * pageSize;

      conn.query(
        `SELECT * FROM catalogue_products limit ${pageSize} OFFSET ${offset}`,
        (err, rows) => {
          if (err) return res.send(err);
          res.json({
            products_page_count: rows.length,
            page_number: page,
            products: rows,
          });
        }
      );
    });
  },
};

module.exports = controller;
