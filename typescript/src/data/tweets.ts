type Tweet = {
  id: string;
  text: string;
  createdAt: Date;
  name: string;
  username: string;
  url?: string;
};

const tweets: Tweet[] = [
  {
    id: "1",
    text: "hello",
    createdAt: new Date(),
    name: "Lee",
    username: "dong Eon",
  },
  {
    id: "2",
    text: "hello Pizza",
    createdAt: new Date(),
    name: "Two",
    username: "dong Eon",
  },
  {
    id: "3",
    text: "hello",
    createdAt: new Date(),
    name: "Three",
    username: "dong Eon",
  },
];

export async function getAll(): Promise<Tweet[]> {
  return tweets;
}
