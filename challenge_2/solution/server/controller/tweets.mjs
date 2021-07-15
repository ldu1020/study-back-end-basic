import * as data from "../data/tweets.mjs";

let { tweets } = data;

export const tweetController = {
  getTweets: (req, res, next) => {
    const username = req.query.username;
    const data = username
      ? tweets.filter((tweet) => tweet.username === username)
      : tweets;
    res.status(200).json(data);
  },
  getTweetsById: (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  },
  postTweet: (req, res, next) => {
    const { text, name, username } = req.body;
    const tweet = {
      id: Date.now().toString(),
      text,
      createdAt: new Date(),
      name,
      username,
    };
    tweets = [tweet, ...tweets];
    res.status(201).json(tweet);
  },
  putTweet: (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
      tweet.text = text;
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  },
  deleteTweet: (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter((tweet) => tweet.id !== id);
    res.sendStatus(204);
  },
};
