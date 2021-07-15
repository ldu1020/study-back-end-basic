import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.js";

const secret = "fSTWh2471^%Vw9dmUyYR$BXL*VJhq&N&";

// jwt.verify(token, secret, (error, decoded) => {
//   console.log(error, decoded);
// });

const makeToken = (username, password) => {
  const token = jwt.sign(
    {
      username,
      password,
    },
    secret,
    { expiresIn: 1800 }
  );
  return token;
};

export async function signUp(req, res) {
  const { username, name, url, email, password } = req.body;
  const token = makeToken(username, password);
  const data = {
    username,
    token,
  };

  authRepository.createUser(username, name, url, email, password);
  res.status(200).json(data);
}

export async function login(req, res) {
  const { username, password } = req.body;
  const token = makeToken(username, password);
  const user = await authRepository.getUser(username);

  if (!user || user.password !== password)
    return res.status(404).json({ message: `id or password is wrong` });

  const data = {
    username,
    token,
  };

  res.status(200).json(data);
}
