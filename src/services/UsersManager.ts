import { connection } from "./MySqlConnection";

export async function getPlayerInformation(uuid: String) {
  const query = `SELECT id, uuid, nick, display_nick, password, permission, email, data_creation FROM adventurer WHERE uuid=? LIMIT 1`;
  const query2 = `SELECT b.* FROM adventurer a INNER JOIN adventurer_attributes b ON a.id=b.id_adventurer WHERE a.uuid=? LIMIT 1;`
  const [rows] = await connection.query(query, [uuid]);
  const [rows2] = await connection.query(query2, [uuid]);
  const response = JSON.parse(JSON.stringify(rows));
  const response2 = JSON.parse(JSON.stringify(rows2));
  const resposta = {
    "Adventurer": response,
    "AdventurerAttributes": response2
  }
  const realresposta = JSON.parse(JSON.stringify(resposta))
  return realresposta;
}

export async function hasPlayer(nick: String) {
  const query = `SELECT COUNT(*) as COUNT FROM adventurer WHERE nick=?;`;
  const [rows] = await connection.query(query, [nick]);
  const row = JSON.parse(JSON.stringify(rows));
  return(row[0].COUNT);
}