import express from "express";
import cors from "cors";

const app = express(); // Cria um servidor
app.use(cors());
app.use(express.json());

const users = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  },

];

const tweets = [
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
];

app.post("/sign-up", (req, res) => {
  const user = req.body;
  if (!user.username || !user.avatar)
    return res.status(422).send("Preencha todos os campos");
  users.push(user);
  res.send("ok");
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  const checkUser = users.find((item) => item.username === tweet.username);
  if (!checkUser) return res.send("UNAUTHORIZED");

  tweets.push(tweet);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  const last10Tweets = tweets.slice(-3, tweets.length);
  for (let i = 0; i < last10Tweets.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (last10Tweets[i].username === users[j].username) {
        last10Tweets[i].avatar = users[j].avatar;
      }
    }
  }

  res.send(last10Tweets);
});

app.listen(5000);
