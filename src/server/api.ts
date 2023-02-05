import express from "express";
import {
  getPlayerByUUID,
  getPlayerLogin,
  registerPlayer
} from "../services/UsersManager";
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
  const { nick, senha } = req.body;
  if (nick && senha) {
    const data = await getPlayerLogin(nick);
    if (await verifyBcrypt(senha, data.password)) {
      res.status(200).send(true);
    } else {
      res.status(400).send(false);
    }
  }
});

router.post("/adventurer/register/", async (req, res) => {
  const { uuid, nick, password, displayNick, permission } = req.body;
  if (uuid && nick && password && displayNick && permission) {
    const senha: string = await hashed(password);
    const data = await registerPlayer(
      uuid,
      nick,
      senha,
      displayNick,
      permission
    );
    if (data.affectedRows === 1) {
      res.status(200).send(true);
    } else {
      res.status(204).send(false);
    }
  }
});
//
module.exports = router;
