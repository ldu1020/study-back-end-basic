import express from "express";

const User = {
  user1: {
    id: "user1",
    name: "Bob",
    profileImage: "",
  },
  user2: {
    id: "user2",
    name: "Anna",
    profileImage: "",
  },
  user3: {
    id: "user3",
    name: "James",
    profileImage: "",
  },
};

let Tweets = [
  {
    id: "1",
    user: User.user2,
    timestamp: 1625829950889,
    content: "내 끝사랑",
  },
  {
    id: "2",
    user: User.user1,
    timestamp: 1625829950889,
    content: "여기는 어디고, 나는 누구",
  },
  {
    id: "3",
    user: User.user3,
    timestamp: 1625829950889,
    content: "소동해요",
  },
  {
    id: "4",
    user: User.user2,
    timestamp: 1625829950889,
    content: "그래, 그랬구나",
  },
];

const router = express.Router();

router.get("/", (req, res) => {
  const { query } = req;

  if (query.userId) {
    const filteredData = Tweets.filter((p) => p.user.id === query.userId);
    res.status(200).json(filteredData);
    return;
  }
  res.status(200).json(Tweets);
});

router.post("/", (req, res) => {
  const { userId, content } = req.body;
  Tweets.push({
    id: Date.now(),
    timestamp: Date.now(),
    user: User[userId],
    content,
  });
  res.sendStatus(201);
});

router.delete("/:id", (req, res) => {
  const { params } = req;
  Tweets = Tweets.filter((p) => p.id !== params.id);
  res.sendStatus(201);
});

router.use((req, res) => {
  res.sendStatus(500);
});

export default router;
