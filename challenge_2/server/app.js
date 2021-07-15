import express from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Dwitter Server");
});

const User = {
  trio: {
    name: "Trio",
    username: "trio",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  ellie: {
    name: "Ellie",
    username: "ellie",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
};

let Tweets = [
  {
    id: "1",
    text: "드림코딩에서 강의 들으면 너무 좋으다",
    createdAt: "2021-05-09T04:20:57.000Z",
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "드림코딩에서 강의 들으면 너무 좋으다",
    createdAt: "2021-05-09T04:20:57.000Z",
    name: "James",
    username: "james",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "3",
    text: "드림코딩에서 강의 들으면 너무 좋으다",
    createdAt: "2021-05-09T04:20:57.000Z",
    name: "Trio",
    username: "trio",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

app.get("/tweets", (req, res) => {
  const { query } = req;

  if (query.username) {
    const filteredData = Tweets.filter((p) => p.username === query.username);
    res.status(200).json(filteredData);
    return;
  }
  res.status(200).json(Tweets);
});

app.get("/tweets/:id", (req, res) => {
  const { id } = req.params;
  const found = Tweets.find((t) => t.id === id);

  if (!found) return res.sendStatus(404);
  res.status(200).json(found);
});

app.post("/tweets", (req, res) => {
  const id = Date.now().toString();
  const createdAt = new Date();
  const { username, text } = req.body;

  console.log(req.body);

  if (!User[username]) return res.sendStatus(400);

  const tweet = {
    id,
    text,
    createdAt,
    ...User[username],
  };
  Tweets.unshift(tweet);
  console.log(tweet);

  res.status(201).send(tweet);
});

app.put("/tweets/:id", (req, res) => {
  const { params } = req;
  const { text } = req.body;

  const targetIndex = Tweets.findIndex((p) => p.id === params.id);
  if (targetIndex === -1) return res.sendStatus(400);

  Tweets[targetIndex].text = text;

  const tweet = Tweets[targetIndex];
  res.status(201).send(tweet);
});

app.delete("/tweets/:id", (req, res) => {
  const { params } = req;

  const targetIndex = Tweets.findIndex((p) => p.id === params.id);
  if (targetIndex === -1) return res.sendStatus(400);

  const updated = Tweets.filter((p) => p.id !== params.id);
  Tweets = updated;

  res.sendStatus(200);
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error();
  res.sendStatus(500);
});

app.listen(8080);
