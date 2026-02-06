let users = [];

export const getAll = () => users;

export const create = (data) => {
  const user = {
    id: Date.now().toString(),
    ...data,
  };
  users.push(user);
  return user;
};

export const update = (id, data) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("User not found");

  users[index] = { ...users[index], ...data };
  return users[index];
};

export const remove = (id) => {
  const before = users.length;
  users = users.filter((u) => u.id !== id);
  if (users.length === before) throw new Error("User not found");
};
