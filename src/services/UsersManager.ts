import { connection } from "./MySqlConnection";

export async function getPlayerByUUID(uuid: String) {
  const query = `SELECT id, uuid, nick, displayNick, permission, email, created_at FROM adventurer WHERE uuid=?`;
  const [rows] = await (await connection).query(query, [uuid]);
  console.log(rows);
  return rows;
}
export async function getPlayerLogin(uuid: String, password: String) {
  const query = `SELECT id, uuid, nick, displayNick, permission, email, created_at FROM adventurer WHERE uuid=? and password=?`;
  const [rows] = await (await connection).query(query, [uuid, password]);
  console.log(rows);
  return rows;
}