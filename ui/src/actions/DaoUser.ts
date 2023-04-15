import { DAO_USER_CONTRACT } from '@/contracts/DaoUser';

export const enrollUser = async (firstName: string, lastName: string, email: string) => {
  const txn = await DAO_USER_CONTRACT.addUserDetails(firstName, lastName, email);
  return await txn.wait();
};

export const updateUser = async (firstName: string, lastName: string, email: string) => {
  const txn = await DAO_USER_CONTRACT.updateUserDetails(firstName, lastName, email);
  return await txn.wait();
};

export const getUserDetails = async (address: string) => {
  const user = await DAO_USER_CONTRACT.userDetails(address);
  if (user.firstName) {
    return { firstname: user.firstName, lastname: user.lastName, email: user.email };
  }
  return null;
};

export const getAllUsers = async () => {
  const users = await DAO_USER_CONTRACT.getAllUsers();
  console.log(users);

  return users;
};
