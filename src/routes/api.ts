import express from "express";
import {
  getPlayerInformation,
  hasPlayer
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

router.post("/adventurer/", async (req, res) => {
  const { uuid } = req.body;
  if (uuid) {
    const data = await getPlayerInformation(uuid);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(400).send(null);
    }
  }
});

router.get("/userExists", async (req, res) => {
  const { nick } = req.query;
  console.log("Nick:", nick);
  
  if (nick) {
    const response = await hasPlayer(nick.toString());
    if (response) {
      if(response===1){
      res.status(200).send(true);
      } else {
        res.status(400).send(false);
      }
    } else {
      res.status(400).send(false);
    }
  }
});
//
module.exports = router;
