export interface User {
  id?: number;

  nickname: string;
  name: string;
  surname: string;
  email: string;
  pass: string;

  apiKey?: string;
  secretKey?: string;

  image?: string;
}
