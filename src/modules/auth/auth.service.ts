import prisma from "../../config/prisma";
import { hashPassword, comparePassword } from "../../utils/password";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";

export const registerUser = async (
  email: string,
  password: string
) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
};
export const refreshAccessToken = async (refreshToken: string) => {
    const payload = verifyRefreshToken(refreshToken);
  
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
  
    if (!user || user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }
  
    const newAccessToken = generateAccessToken(user.id);
  
    return { accessToken: newAccessToken };
  };
  
  export const logoutUser = async (refreshToken: string) => {
    const payload = verifyRefreshToken(refreshToken);
  
    await prisma.user.update({
      where: { id: payload.userId },
      data: { refreshToken: null },
    });
  };
  

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });
  

  return { accessToken, refreshToken };
};
