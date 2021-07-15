let Users = {};

export async function getUser(username) {
  return Users[username];
}

export async function createUser(username, name, url, email, password) {
  const user = {
    email,
    username,
    name,
    url,
    password,
  };

  Users[username] = user;
  return user;
}
