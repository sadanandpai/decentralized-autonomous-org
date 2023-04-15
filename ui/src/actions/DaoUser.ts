import { DAO_USER_CONTRACT } from '@/contracts/DaoUser';

export const enrollUser = async (firstName: string, lastName: string, email: string) => {
  try {
    await DAO_USER_CONTRACT.addUserDetails(firstName, lastName, email);
  } catch {
    console.log('Something went wrong');
  }
};
