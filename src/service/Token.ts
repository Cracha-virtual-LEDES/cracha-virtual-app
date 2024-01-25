"use server";

import { SignJWT, jwtVerify } from "jose";

function getJwtSecretKey() {
  const secret = process.env.PUBLIC_JWT_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

const verifyJwtToken = async (token: string) => {
  try {
    const secret = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secret);
    console.log(secret, token, payload);
    return payload;
  } catch (error) {
    return null;
  }
};

const issueToken = async (payload: any) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(getJwtSecretKey());

  return token;
};

export const Token = { issueToken, verifyJwtToken };
