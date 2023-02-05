import express from "express";
import { getPlayerByUUID, getPlayerLogin } from "../services/UsersManager";
import { hashed, verifyBcrypt } from "../utils/bcrypt";

const router = express.Router();

router.use(function timeLogin(req, res, next) {
  console.log("Time", Date.now());
  next();
});

router.get("/ping", (req, res) => {
  res.status(202).send({ Ping: "Pong" }).json();
});

router.get("/test", async (req, res) => {
  const senha: string = await hashed("tested");
  const result = await verifyBcrypt("tested", senha);
  res.status(200).send(result);
});

router.get("/adventurers", async (req, res) => {
  res.send("Pong");
});

router.get("/adventurer/nick/:nick", async (req, res) => {
  const { nick } = req.params;
  if (nick) {
    console.log("Chegou aq -> NICK");
    const response = await getPlayerByUUID(nick);
    res.status(200).send(response);
  }
});

router.post("/adventurer/login/", async (req, res) => {
  console.log(req.body);
  const { nick, senha } = req.body;
  if (nick && senha) {
    console.log("Chegou aq -> Senha");
  
    const data = await getPlayerLogin(nick, senha);
    console.log(data.toString);

    const jason = JSON.parse(data.toString());

    console.log(jason);

    const password = jason[0].password;

    console.log(password);

    res.status(200).send(data);
  }
});

module.exports = router;
