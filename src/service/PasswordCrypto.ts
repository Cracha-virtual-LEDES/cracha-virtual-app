import { hash, genSalt, compare } from "bcryptjs";

const SALT_RANDOMS = 8;

const hashPassword = async (password: string) => {
  const saltGenerator = await genSalt(SALT_RANDOMS);
  return await hash(password, saltGenerator);
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = { hashPassword, comparePassword };
