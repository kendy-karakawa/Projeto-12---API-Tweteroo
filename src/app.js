import express from "express";
import cors from "cors";

const app = express(); // Cria um servidor
app.use(cors())


// Configura uma função pra ser executada quando bater um GET na rota "/"
app.get("/", (req, res) => {
  res.send("hello word");
});

app.listen(5000);
