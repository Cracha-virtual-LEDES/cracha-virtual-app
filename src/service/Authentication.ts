import { Pessoa } from "@prisma/client";

import prisma from "../../lib/db";
import { PasswordCrypto, Token } from "./index";

interface LoginData {
  email: string;
  password: string;
}

interface UserData extends Omit<Pessoa, "password"> {
  password: string | undefined;
}

type RegisterData = Omit<Pessoa, "id" | "verified" | "isAdmin">;

const login = async ({
  email,
  password,
}: LoginData): Promise<string | null> => {
  const user = await prisma.pessoa.findUnique({ where: { email } });

  if (
    !user ||
    !(await PasswordCrypto.comparePassword(password, user.password))
  ) {
    return null;
  }

  const token = await Token.issueToken(user);

  return token;
};

const register = async (data: RegisterData): Promise<UserData> => {
  const newUser = {
    ...data,
    password: await PasswordCrypto.hashPassword(data.password),
  };

  const user = await prisma.pessoa.create({
    data: {
      ...newUser,
      verified: false,
      isAdmin: false,
    },
  });

  return { ...user, password: undefined };
};

export const Authentication = { login, register };
