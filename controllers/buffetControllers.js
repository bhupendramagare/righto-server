import conn from "../db/conn.js";
import sendMessageToTopic from "../services/mqttService.js";

class Buffet {
  static getAll = (req, res) => {
    conn.query("SELECT * FROM buffet", (err, result) => {
      if (err) {
        res.status(422).json("nodata available");
      } else {
        res.status(201).json(result);
      }
    });
  };

  static add = (req, res) => {
    // Extract buffet data from request body
    const { _id, PRODUCT_ID, NAME, CALORIES, ALLERGEN, NOTE } = req.body;

    sendMessageToTopic("RightoLabel/BLE/VP0", {
      _id,
      PRODUCT_ID,
      NAME,
      CALORIES,
      ALLERGEN,
      NOTE,
    });

    // SQL query to insert a new buffet into the database
    const sql =
      "INSERT INTO buffet (_id, PRODUCT_ID, NAME, CALORIES, ALLERGEN, NOTE) VALUES (?, ?, ?, ?, ?, ?)";

    // Execute the SQL query with buffet data
    conn.query(
      sql,
      [_id, PRODUCT_ID, NAME, CALORIES, ALLERGEN, NOTE],
      (err, result) => {
        if (err) {
          console.error("Error adding buffet food:", err);
          res.status(500).json({ error: "Failed to add buffet food" });
        } else {
          console.log("New buffet food added successfully");
          res
            .status(201)
            .json({ message: "New buffet food added successfully" });
        }
      }
    );
  };

  static addMany = (req, res) => {
    // Extract buffet data array from request body
    const buffet = req.body;

    // SQL query to insert multiple buffets into the database
    const sql =
      "INSERT INTO buffet (_id, PRODUCT_ID, NAME, CALORIES, ALLERGEN, NOTE) VALUES ?";

    // Extract values from buffets array for bulk insert
    const values = buffet.map((item) => [
      item._id,
      item.PRODUCT_ID,
      item.NAME,
      item.CALORIES,
      item.ALLERGEN,
      item.NOTE,
    ]);

    // Execute the SQL query with buffet data for bulk insert
    conn.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error inserting buffets:", err);
        res.status(500).json({ error: "Failed to insert buffets" });
      } else {
        console.log("buffets inserted successfully");
        res.status(201).json({ message: "buffets inserted successfully" });
      }
    });
  };
}

export default Buffet;
