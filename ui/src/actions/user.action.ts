import { getDaoUserContract } from '@/contracts/user.contract';

export const enrollUser = async (
  firstName: string,
  lastName: string,
  email: string,
  pic: string
) => {
  return await getDaoUserContract().addUserDetails(firstName, lastName, email, pic);
};

export const updateUser = async (
  firstName: string,
  lastName: string,
  email: string,
  pic: string
) => {
  return await getDaoUserContract().updateUserDetails(firstName, lastName, email, pic);
};

export const getUserDetails = async (address: string) => {
  const user = await getDaoUserContract().userDetails(address);
  if (user.firstName) {
    return { firstname: user.firstName, lastname: user.lastName, email: user.email, pic: user.pic };
  }
  return null;
};

export const getAllUsers = async () => {
  const users = await getDaoUserContract().getAllUsers();
  return users;
};
