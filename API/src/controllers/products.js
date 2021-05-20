"user strict";

let validator = require("validator");
let controller = {
  update: (req, res) => {
    req.getConnection((err, conn) => {
      if (err) throw err;

      var productId = req.params.productId;

      conn.query(
        `SELECT * FROM catalogue_products WHERE id = ${productId}`,
        (err, row) => {
          if (err) return res.send(err);

          if (row.length > 0) {
            var sql = `UPDATE catalogue_products SET stock = ${
              row[0].stock - 1
            } WHERE id = ${productId}`;
            conn.query(sql, function (err, result) {
              if (err) throw err;
              res.json({
                message: result.affectedRows + " record(s) updated",
              });
            });
          } else {
            res.json({
              message: "Sin registros",
            });
          }
        }
      );
    });
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

          conn.query(
            `SELECT COUNT(*) as totalRows FROM catalogue_products`,
            (err, count) => {
              if (err) return res.send(err);
              res.json({
                products_page_count: rows.length,
                total_pages: Math.ceil(count[0].totalRows / pageSize),
                page_number: page,
                products: rows,
              });
            }
          );
        }
      );
    });
  },
};

module.exports = controller;
