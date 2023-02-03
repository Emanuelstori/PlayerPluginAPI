import { connection } from "./MySqlConnection";

export async function getPlayerByUUID(uuid: String) {
  const query = `SELECT id, uuid, nick, displayNick, permission, email, created_at FROM adventurer WHERE uuid=?`;
  const [rows] = await (await connection).query(query, [uuid]);
  console.log(rows);
  return rows;
}