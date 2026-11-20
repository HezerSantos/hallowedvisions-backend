export const getTokenTimes = (exp: number, unit: "d" | "h" | "m") => {
  let expiration = 0;
  switch (unit) {
    case "d":
      expiration = exp * 24 * 60 * 60;
      break;
    case "h":
      expiration = exp * 60 * 60;
      break;
    case "m":
      expiration = exp * 60;
      break;
    default:
      expiration = exp;
  }
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + expiration;
  return { issuedAt, expiresAt };
};

export interface PublicResponse {
  token: string;
  expiresAt: number;
  issuedAt: number;
}
