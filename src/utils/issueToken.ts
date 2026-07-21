import generateToken from "./generateToken.js";
interface TokenPayload {
  _id: string;
  role: string;
}

export default async function issueToken(obj: TokenPayload) {
  const { accessToken, refreshToken } = await generateToken(obj);
  console.log(accessToken, refreshToken);
}
