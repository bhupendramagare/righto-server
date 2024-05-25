import conn from "../db/conn.js";
import sendMessageToTopic from "../services/mqttService.js";

class Buffet {
  static getAll = (req, res) => {
    conn.query("SELECT * FROM buffet", (err, result) => {
      if (err) {
        console.error("Error fetching buffet items:", err);
        res.status(500).json({ error: "Failed to retrieve buffet items" });
      } else {
        res.status(200).json(result);
      }
    });
  };

  static getAllByToken = (req, res) => {
    const token = req.params.token;
    conn.query(
      `SELECT * FROM buffet WHERE PRODUCT_ID LIKE "${token}%"`,
      (err, result) => {
        if (err) {
          console.error("Error fetching buffet items:", err);
          res.status(500).json({ error: "Failed to retrieve buffet items" });
        } else {
          res.status(200).json(result);
        }
      }
    );
  };

  static add = (req, res) => {
    const { token, data } = req.body;
    const { _id, PRODUCT_ID, NAME, CALORIES, ALLERGEN, NOTE } = data;

    sendMessageToTopic(`RightoLabel/BLE/${token}`, [
      {
        _id,
        BUFFET_ID: PRODUCT_ID,
        BUFFET_NAME: NAME,
        BUFFET_ALLERGEN: ALLERGEN,
        BUFFET_CALORIES: CALORIES,
        NOTE,
      },
    ]);

    const sql =
      "INSERT INTO buffet (_id, PRODUCT_ID, NAME, CALORIES, ALLERGEN, NOTE) VALUES (?, ?, ?, ?, ?, ?)";

    conn.query(
      sql,
      [_id, PRODUCT_ID, NAME, CALORIES, ALLERGEN, NOTE],
      (err, result) => {
        if (err) {
          console.error("Error adding buffet item:", err);
          res.status(500).json({ error: "Failed to add buffet item" });
        } else {
          console.log("New buffet item added successfully");
          res
            .status(201)
            .json({ message: "New buffet item added successfully" });
        }
      }
    );
  };

  static addMany = (req, res) => {
    const { token, newDataArray } = req.body;

    const mqttData = newDataArray.map((element) => ({
      BUFFET_ID: element.PRODUCT_ID,
      BUFFET_NAME: element.NAME,
      BUFFET_ALLERGEN: element.ALLERGEN,
      BUFFET_CALORIES: element.CALORIES,
    }));

    console.log(mqttData);

    sendMessageToTopic(`RightoLabel/BLE/${token}`, mqttData);

    const sql =
      "INSERT INTO buffet (_id, PRODUCT_ID, NAME, CALORIES, ALLERGEN, NOTE) VALUES ?";

    const values = newDataArray.map((item) => [
      item._id,
      item.PRODUCT_ID,
      item.NAME,
      item.CALORIES,
      item.ALLERGEN,
      item.NOTE,
    ]);

    conn.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error inserting buffet items:", err);
        res.status(500).json({ error: "Failed to insert buffet items" });
      } else {
        console.log("Buffet items inserted successfully");
        res.status(201).json({ message: "Buffet items inserted successfully" });
      }
    });
  };
}

export default Buffet;
