import conn from "../db/conn.js";

class SweetShop {
  static getAll = (req, res) => {
    conn.query("SELECT * FROM sweet_shop", (err, result) => {
      if (err) {
        console.error("Error fetching sweet shop products:", err);
        res
          .status(500)
          .json({ error: "Failed to retrieve sweet shop products" });
      } else {
        res.status(200).json(result);
      }
    });
  };

  static add = (req, res) => {
    const { _id, PRODUCT_ID, NAME, PRICE, BEST_BEFORE_DATE, DISC_NOTE } =
      req.body;

    const sql =
      "INSERT INTO sweet_shop (_id, PRODUCT_ID, NAME, PRICE, BEST_BEFORE_DATE, DISC_NOTE) VALUES (?, ?, ?, ?, ?, ?)";

    conn.query(
      sql,
      [_id, PRODUCT_ID, NAME, PRICE, BEST_BEFORE_DATE, DISC_NOTE],
      (err, result) => {
        if (err) {
          console.error("Error adding sweet shop product:", err);
          res.status(500).json({ error: "Failed to add sweet shop product" });
        } else {
          console.log("New sweet shop product added successfully");
          res
            .status(201)
            .json({ message: "New sweet shop product added successfully" });
        }
      }
    );
  };

  static addMany = (req, res) => {
    const products = req.body;

    const sql =
      "INSERT INTO sweet_shop (_id, PRODUCT_ID, NAME, PRICE, BEST_BEFORE_DATE, DISC_NOTE) VALUES ?";

    const values = products.map((product) => [
      product._id,
      product.PRODUCT_ID,
      product.NAME,
      product.PRICE,
      product.BEST_BEFORE_DATE,
      product.DISC_NOTE,
    ]);

    conn.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error inserting sweet shop products:", err);
        res.status(500).json({ error: "Failed to insert sweet shop products" });
      } else {
        console.log("Sweet shop products inserted successfully");
        res
          .status(201)
          .json({ message: "Sweet shop products inserted successfully" });
      }
    });
  };

  static update = (req, res) => {
    console.log("Hello");
    const { _id, PRODUCT_ID, NAME, PRICE, BEST_BEFORE_DATE, DISC_NOTE } =
      req.body;
    const paramId = req.params.id;

    const sql = `
      UPDATE sweet_shop 
      SET 
        _id = ?, 
        PRODUCT_ID = ?, 
        NAME = ?, 
        PRICE = ?, 
        BEST_BEFORE_DATE = ?, 
        DISC_NOTE = ? 
      WHERE 
        _id = ?
    `;

    conn.query(
      sql,
      [_id, PRODUCT_ID, NAME, PRICE, BEST_BEFORE_DATE, DISC_NOTE, paramId],
      (err, result) => {
        if (err) {
          console.error("Error updating sweet shop product:", err);
          res
            .status(500)
            .json({ error: "Failed to update sweet shop product" });
        } else {
          console.log("Sweet shop product updated successfully");
          res
            .status(200)
            .json({ message: "Sweet shop product updated successfully" });
        }
      }
    );
  };
}

export default SweetShop;
