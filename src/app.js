import express from "express";
import cors from "cors";

const app = express(); // Cria um servidor
app.use(cors())
app.use(express.json())

const users = [{
	username: 'bobesponja', 
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
}]

const tweets = [{
	username: "bobesponja",
  tweet: "eu amo o hub"
}]

app.post("/sign-up", (req, res)=>{
  const user = req.body
  console.log(user)
  if(!user.username || !user.avatar) return res.status(422).send("Preencha todos os campos")
  users.push(user)
  res.send("ok")

})

app.post("/tweets", (req, res)=>{
  const tweet = req.body
  const checkUser = users.find(item => item.username === tweet.username)
  if (!checkUser) return res.send("UNAUTHORIZED")

  tweets.push(tweet)
  res.send("OK")

})


// Configura uma função pra ser executada quando bater um GET na rota "/"
app.get("/", (req, res) => {
  res.send("hello word");
});

app.listen(5000);
