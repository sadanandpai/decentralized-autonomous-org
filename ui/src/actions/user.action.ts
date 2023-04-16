import { getDaoUserContract } from '@/contracts/user.contract';

export const enrollUser = async (firstName: string, lastName: string, email: string) => {
  return await getDaoUserContract().addUserDetails(firstName, lastName, email);
};

export const updateUser = async (firstName: string, lastName: string, email: string) => {
  const txn = await getDaoUserContract().updateUserDetails(firstName, lastName, email);
  return await txn.wait();
};

export const getUserDetails = async (address: string) => {
  const user = await getDaoUserContract().userDetails(address);
  if (user.firstName) {
    return { firstname: user.firstName, lastname: user.lastName, email: user.email };
  }
  return null;
};

export const getAllUsers = async () => {
  const users = await getDaoUserContract().getAllUsers();
  return users;
};
