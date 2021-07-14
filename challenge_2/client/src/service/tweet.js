export default class TweetService {
  basis = "http://localhost:8080";

  async getTweets(username) {
    return fetch(
      `${this.basis}/tweets${username ? `?username=${username}` : ""}`
    ).then((res) => res.json());
  }

  async postTweet(text) {
    const tweet = {
      id: Date.now(),
      createdAt: new Date(),
      name: "Ellie",
      username: "ellie",
      text,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: tweet.username,
      text: text,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(`${this.basis}/tweets`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  }

  async deleteTweet(tweetId) {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${this.basis}/tweets/${tweetId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async updateTweet(tweetId, text) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      text,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch(`http://localhost:8080/tweets/${tweetId}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  }
}
