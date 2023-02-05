import { connection } from "./MySqlConnection";

export async function getPlayerByUUID(uuid: String) {
  const query = `SELECT id, uuid, nick, displayNick, permission, email, created_at FROM adventurer WHERE nick=?`;
  const [rows] = await (await connection).query(query, [uuid]);
  console.log(rows);
  return rows;
}
export async function getPlayerLogin(uuid: String, password: String) {
  const query = `SELECT password FROM adventurer WHERE nick=? and password=?`;
  const [rows] = await (await connection).query(query, [uuid, password]);
  console.log(rows);
  return rows;
}
export async function registerPlayer(uuid: String, nick: String, password: String, displayNick: String, permission: String, email: String) {
  const query = `Insert into adventurer(uuid, nick, password, displayNick, permission, email) VALUES (?,?,?,?,?,?)`;
  const [rows] = await (await connection).query(query, [uuid, nick, password, displayNick, permission, email]);
  console.log(rows);
  return rows;
}