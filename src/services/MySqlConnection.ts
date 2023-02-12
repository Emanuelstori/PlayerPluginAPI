import mysql from "mysql2/promise";

export const connection = mysql.createPool({
  connectionLimit : 2,
  multipleStatements: true,
  host: "localhost",
  user: "runeforgerapi",
  port: 3307,
  password: "Ap1Run3Forger",
  database: "runeforger",
});
