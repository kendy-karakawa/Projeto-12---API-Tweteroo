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
  {
    username: "bobesponja",
    tweet: "1",
  },
  {
    username: "bobesponja",
    tweet: "2",
  },
  {
    username: "bobesponja",
    tweet: "3",
  },
  {
    username: "bobesponja",
    tweet: "4",
  },
  {
    username: "bobesponja",
    tweet: "5",
  },
  {
    username: "bobesponja",
    tweet: "6",
  },
  {
    username: "bobesponja",
    tweet: "7",
  },
  {
    username: "bobesponja",
    tweet: "8",
  },
  {
    username: "bobesponja",
    tweet: "9",
  },
  {
    username: "bobesponja",
    tweet: "10",
  },
  {
    username: "bobesponja",
    tweet: "11",
  },
  {
    username: "bobesponja",
    tweet: "12",
  },
  {
    username: "bobesponja",
    tweet: "13",
  },
  {
    username: "bobesponja",
    tweet: "14",
  },
  {
    username: "bobesponja",
    tweet: "15",
  },
  {
    username: "bobesponja",
    tweet: "16",
  },
  {
    username: "bobesponja",
    tweet: "17",
  },
  {
    username: "bobesponja",
    tweet: "18",
  },
  {
    username: "bobesponja",
    tweet: "19",
  },
  {
    username: "bobesponja",
    tweet: "20",
  },
  {
    username: "bobesponja",
    tweet: "21",
  },
];

function addAvatarOnTweet(tweets) {
  for (let i = 0; i < tweets.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (tweets[i].username === users[j].username) {
        tweets[i].avatar = users[j].avatar;
      }
    }
  }
}

app.post("/sign-up", (req, res) => {
  const user = req.body;
  if (!user.username || !user.avatar)
    return res.status(400).send("Todos os campos são obrigatórios!");
  users.push(user);
  res.status(201).send("ok");
});
  
app.post("/tweets", (req, res) => {
  const tweeted = req.body;
  if (!tweeted.tweet){
    return res.status(400).send("Todos os campos são obrigatórios!");
  }
  const user = req.headers.user
  const checkUser = users.find((item) => item.username === user);
  if (!checkUser) return res.status(401).send("UNAUTHORIZED");

  tweeted.username = user
  tweets.push(tweeted);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const { page } = req.query;
  const pageNumber = Number(page);
  if (page) {
    if (pageNumber < 1)
      return res.status(400).send("Informe uma página válida!");

    const currentPage = tweets.slice(
      pageNumber * -10,
      tweets.length - (pageNumber - 1) * 10
    );
    addAvatarOnTweet(currentPage);

    res.status(200).send(currentPage.reverse());
  } else {
    const last10Tweets = tweets.slice(-10, tweets.length);
    addAvatarOnTweet(last10Tweets);
    res.send(last10Tweets.reverse());
  }
});

app.get("/tweets/:USERNAME", (req, res) => {
  const name = req.params.USERNAME;
  console.log(name);
  const userTweets = tweets.filter((item) => item.username === name);
  addAvatarOnTweet(userTweets);
  res.send(userTweets);
});

// app.get("/tweets", (req, res) =>{
//   const {page} = parseInt(req.query)
//   if (page < 1) return res.status(400).send("Informe uma página válida!")
//   res.send(page)
// })

app.listen(5000);
