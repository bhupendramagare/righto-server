import { createConnection } from "mysql2";

const conn = createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("DB connected");
});

export default conn;
