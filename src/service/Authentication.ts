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

const register = async (data: any): Promise<any> => {


  const newPessoa = {
    ...data.pessoa,
    password: await PasswordCrypto.hashPassword(data.pessoa.password),
    isAdmin: false
  };

  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);

  const newCracha = {
    ...data.cracha,
    verified: false,
    expirationDate: expirationDate
  };

  const pessoa = await prisma.pessoa.create({
    data: newPessoa
  });

  const cracha = await prisma.cracha.create({
    data: {...newCracha, pessoaId: pessoa.id}
  });

  return { ...{pessoa: {...pessoa, password: undefined}, cracha: cracha}};
};

export const Authentication = { login, register };
