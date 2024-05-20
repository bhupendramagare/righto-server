import conn from "../db/conn.js";
import sendMessageToTopic from "../services/mqttService.js";

class Patient {
  static getAll = (req, res) => {
    conn.query("SELECT * FROM patients", (err, result) => {
      if (err) {
        console.error("Error fetching patients:", err);
        res.status(500).json({ error: "No data available" });
      } else {
        res.status(200).json(result);
      }
    });
  };

  static add = (req, res) => {
    const {
      _id,
      PRODUCT_ID,
      NAME,
      AGE,
      GENDER,
      CONSULTING_DR,
      ADMITTED_DATE,
      PROCEDURE_NAME,
      MODE_OF_PAYMENT,
    } = req.body;

    sendMessageToTopic("RightoLabel/BLE/VP0", {
      _id,
      PRODUCT_ID,
      NAME,
      AGE,
      GENDER,
      CONSULTING_DR,
      ADMITTED_DATE,
      PROCEDURE_NAME,
      MODE_OF_PAYMENT,
    });

    const sql = `
      INSERT INTO patients (_id, PRODUCT_ID, NAME, AGE, GENDER, CONSULTING_DR, ADMITTED_DATE, PROCEDURE_NAME, MODE_OF_PAYMENT) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conn.query(
      sql,
      [
        _id,
        PRODUCT_ID,
        NAME,
        AGE,
        GENDER,
        CONSULTING_DR,
        ADMITTED_DATE,
        PROCEDURE_NAME,
        MODE_OF_PAYMENT,
      ],
      (err, result) => {
        if (err) {
          console.error("Error adding patient:", err);
          res.status(500).json({ error: "Failed to add patient" });
        } else {
          console.log("New patient added successfully");
          res.status(201).json({ message: "New patient added successfully" });
        }
      }
    );
  };

  static addMany = (req, res) => {
    const patients = req.body;

    const sql = `
      INSERT INTO patients (_id, PRODUCT_ID, NAME, AGE, GENDER, CONSULTING_DR, ADMITTED_DATE, PROCEDURE_NAME, MODE_OF_PAYMENT) 
      VALUES ?
    `;

    const values = patients.map((patient) => [
      patient._id,
      patient.PRODUCT_ID,
      patient.NAME,
      patient.AGE,
      patient.GENDER,
      patient.CONSULTING_DR,
      patient.ADMITTED_DATE,
      patient.PROCEDURE_NAME,
      patient.MODE_OF_PAYMENT,
    ]);

    conn.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error inserting patients:", err);
        res.status(500).json({ error: "Failed to insert patients" });
      } else {
        console.log("Patients inserted successfully");
        res.status(201).json({ message: "Patients inserted successfully" });
      }
    });
  };

  static update = (req, res) => {
    const {
      _id,
      PRODUCT_ID,
      NAME,
      AGE,
      GENDER,
      CONSULTING_DR,
      ADMITTED_DATE,
      PROCEDURE_NAME,
      MODE_OF_PAYMENT,
    } = req.body;
    const patientId = req.params.id;

    const sql = `
      UPDATE patients 
      SET 
        _id = ?, 
        PRODUCT_ID = ?, 
        NAME = ?, 
        AGE = ?, 
        GENDER = ?, 
        CONSULTING_DR = ?, 
        ADMITTED_DATE = ?, 
        PROCEDURE_NAME = ?, 
        MODE_OF_PAYMENT = ? 
      WHERE 
        _id = ?
    `;

    conn.query(
      sql,
      [
        _id,
        PRODUCT_ID,
        NAME,
        AGE,
        GENDER,
        CONSULTING_DR,
        ADMITTED_DATE,
        PROCEDURE_NAME,
        MODE_OF_PAYMENT,
        patientId,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating patient:", err);
          res.status(500).json({ error: "Failed to update patient" });
        } else {
          console.log("Patient updated successfully");
          res.status(200).json({ message: "Patient updated successfully" });
        }
      }
    );
  };
}

export default Patient;
