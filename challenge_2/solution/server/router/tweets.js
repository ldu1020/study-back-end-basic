import express from "express";
import "express-async-errors";
import { tweetController } from "../controller/tweets.mjs";

const router = express.Router();

const { getTweets, getTweetsById, postTweet, putTweet, deleteTweet } =
  tweetController;

router.get("/", getTweets);
router.get("/:id", getTweetsById);
router.post("/", postTweet);
router.put("/:id", putTweet);
router.delete("/:id", deleteTweet);

export default router;
