import jwt from "jsonwebtoken";

interface TokenPayload {
  _id: string;
  role: string;
}
export default async function generateToken(obj: TokenPayload) {
  const accessToken = jwt.sign(
    { _id: obj._id, role: obj.role },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    },
  );
  const refreshToken = jwt.sign(
    { _id: obj._id, role: obj.role },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    },
  );
  return { accessToken, refreshToken };
}
