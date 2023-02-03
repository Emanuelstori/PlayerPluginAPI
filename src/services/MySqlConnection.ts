import mysql from "mysql2/promise";

export const connection = mysql.createConnection({
  multipleStatements: true,
  host: "mysql.runeforger.com",
  user: "runeforgerapi",
  port: 3307,
  password: "Ap1Run3Forger",
  database: "runeforger",
});
