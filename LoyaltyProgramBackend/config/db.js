import mysql from "mysql2/promise";

const connectToDatabase = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connectToDatabase;
