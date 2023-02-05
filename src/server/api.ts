import express from "express";
import { getPlayerByUUID, getPlayerLogin } from "../services/UsersManager";

const router = express.Router();

router.use(function timeLogin(req, res, next) {
  console.log("Time", Date.now());
  next();
});

router.get("/ping", (req, res) => {
  res.status(202).send({ Ping: "Pong" }).json();
});

router.get("/adventurers", async (req, res) => {
  res.send("Pong");
});

router.get("/adventurer/uuid/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const uuidRegex =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
    if (!id.match(uuidRegex)) {
      return res.status(400).json({ err: "UUID inválido." });
    }
    console.log("Chegou aq -> UUID");
    const response = await getPlayerByUUID(id);
    res.status(200).send(response);
  }
});

router.post("/adventurer/login/",async (req, res) => {
  console.log(req.body);
  const { id, senha } = req.body;
  if(id && senha){
      const uuidRegex=  
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
      if (!id.match(uuidRegex)) {
        return res.status(400).json({ err: "UUID inválido." });
      }
      console.log("Chegou aq -> Senha");
      
      const data = await getPlayerLogin(id, senha);
      res.status(200).send(data);
  }
})

module.exports = router;
