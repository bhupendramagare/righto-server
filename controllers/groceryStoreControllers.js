import conn from "../db/conn.js";

class GroceryStore {
  static getAll = (req, res) => {
    conn.query("SELECT * FROM grocery_store", (err, result) => {
      if (err) {
        console.error("Error fetching grocery store products:", err);
        res
          .status(500)
          .json({ error: "Failed to retrieve grocery store products" });
      } else {
        res.status(200).json(result);
      }
    });
  };

  static add = (req, res) => {
    const { _id, PRODUCT_ID, NAME, PRICE, SALE_PRICE, DISC_NOTE } = req.body;

    const sql =
      "INSERT INTO grocery_store (_id, PRODUCT_ID, NAME, PRICE, SALE_PRICE, DISC_NOTE) VALUES (?, ?, ?, ?, ?, ?)";

    conn.query(
      sql,
      [_id, PRODUCT_ID, NAME, PRICE, SALE_PRICE, DISC_NOTE],
      (err, result) => {
        if (err) {
          console.error("Error adding grocery store product:", err);
          res
            .status(500)
            .json({ error: "Failed to add grocery store product" });
        } else {
          console.log("New grocery store product added successfully");
          res
            .status(201)
            .json({ message: "New grocery store product added successfully" });
        }
      }
    );
  };

  static addMany = (req, res) => {
    const products = req.body;

    const sql =
      "INSERT INTO grocery_store (_id, PRODUCT_ID, NAME, PRICE, SALE_PRICE, DISC_NOTE) VALUES ?";

    const values = products.map((product) => [
      product._id,
      product.PRODUCT_ID,
      product.NAME,
      product.PRICE,
      product.SALE_PRICE,
      product.DISC_NOTE,
    ]);

    conn.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error inserting grocery store products:", err);
        res
          .status(500)
          .json({ error: "Failed to insert grocery store products" });
      } else {
        console.log("Grocery store products inserted successfully");
        res
          .status(201)
          .json({ message: "Grocery store products inserted successfully" });
      }
    });
  };

  static update = (req, res) => {
    const { _id, PRODUCT_ID, NAME, PRICE, SALE_PRICE, DISC_NOTE } = req.body;
    const paramId = req.params.id;

    const sql = `
      UPDATE grocery_store 
      SET 
        _id = ?, 
        PRODUCT_ID = ?, 
        NAME = ?, 
        PRICE = ?, 
        SALE_PRICE = ?, 
        DISC_NOTE = ? 
      WHERE 
        _id = ?
    `;

    conn.query(
      sql,
      [_id, PRODUCT_ID, NAME, PRICE, SALE_PRICE, DISC_NOTE, paramId],
      (err, result) => {
        if (err) {
          console.error("Error updating grocery store product:", err);
          res
            .status(500)
            .json({ error: "Failed to update grocery store product" });
        } else {
          console.log("Grocery store product updated successfully");
          res
            .status(200)
            .json({ message: "Grocery store product updated successfully" });
        }
      }
    );
  };
}

export default GroceryStore;
