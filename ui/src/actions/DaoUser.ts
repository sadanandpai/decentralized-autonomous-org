import { DAO_USER_CONTRACT } from "@/contracts/DaoUser";

export const enrollUser = async () => {
  try {
    await DAO_USER_CONTRACT.createUser("Sadanand", "Pai");
  } catch {
    console.log("Something went wrong");
  }
};
