import conn from "../db/conn.js";

class Patient {
  static getAll = (req, res) => {
    conn.query("SELECT * FROM patients", (err, result) => {
      if (err) {
        res.status(422).json("nodata available");
      } else {
        res.status(201).json(result);
      }
    });
  };

  static add = (req, res) => {
    // Extract patient data from request body
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

    // SQL query to insert a new patient into the database
    const sql =
      "INSERT INTO patients (_id, PRODUCT_ID, NAME, AGE, GENDER, CONSULTING_DR, ADMITTED_DATE, PROCEDURE_NAME, MODE_OF_PAYMENT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Execute the SQL query with patient data
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
    // Extract patient data array from request body
    const patients = req.body;

    // SQL query to insert multiple patients into the database
    const sql =
      "INSERT INTO patients (_id, PRODUCT_ID, NAME, AGE, GENDER, CONSULTING_DR, ADMITTED_DATE, PROCEDURE_NAME, MODE_OF_PAYMENT) VALUES ?";

    // Extract values from patients array for bulk insert
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

    // Execute the SQL query with patient data for bulk insert
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
    // Extract patient data from request body
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

    // SQL query to update the patient in the database
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

    // Execute the SQL query with patient data
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
