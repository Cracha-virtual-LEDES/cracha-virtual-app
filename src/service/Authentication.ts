import { Cracha, Pessoa } from "@prisma/client";

import prisma from "../../lib/db";
import { PasswordCrypto, Token } from "./index";

type LoginData = {
  email: string;
  password: string;
};

interface PessoaSemSenha extends Omit<Pessoa, "password"> {
  password: undefined;
}

interface RegisterDTO {
  pessoa: Pessoa;
  cracha: Cracha;
}

interface RegisterData {
  pessoa: PessoaSemSenha;
  cracha: Cracha;
}

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

  const payload = {
    ...user,
    password: undefined,
  };

  const token = await Token.issueToken(payload);

  return token;
};

const register = async (data: RegisterDTO): Promise<RegisterData> => {
  const newPessoa = {
    ...data.pessoa,
    password: await PasswordCrypto.hashPassword(data.pessoa.password),
    isAdmin: false,
  };

  const expirationDate = new Date();

  const newCracha = {
    ...data.cracha,
    verified: false,
    expirationDate: expirationDate,
  };

  const pessoa = await prisma.pessoa.create({
    data: newPessoa,
  });

  const cracha = await prisma.cracha.create({
    data: { ...newCracha, pessoaId: pessoa.id },
  });

  return { pessoa: { ...pessoa, password: undefined }, cracha: cracha };
};

export const Authentication = { login, register };
