import { connection } from "./MySqlConnection";

export async function getPlayerByUUID(uuid: String) {
  const query = `SELECT id, uuid, nick, displayNick, permission, email, created_at FROM adventurer WHERE nick=?`;
  const [rows] = await (await connection).query(query, [uuid]);
  const response = JSON.parse(JSON.stringify(rows));
  return response[0];
}
export async function getPlayerLogin(nick: String) {
  const query = `SELECT * FROM adventurer WHERE nick=?`;
  const [rows] = await (await connection).query(query, [nick]);
  const response = JSON.parse(JSON.stringify(rows));
  return response[0];
}
export async function registerPlayer(uuid: String, nick: String, password: String, displayNick: String, permission: String) {
  const query = `INSERT INTO adventurer(uuid, nick, password, displayNick, permission) VALUES (?,?,?,?,?)`;
  const [rows] = await (await connection).query(query, [uuid, nick, password, displayNick, permission]);
  const response = JSON.parse(JSON.stringify(rows));
  return response;
}
