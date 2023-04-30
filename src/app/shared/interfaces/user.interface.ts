export interface User {
  id?: number;

  nickname: string;
  name: string;
  surname: string;
  email: string;
  pass: string;

  pub?: string;
  prib?: string;

  image?: string | ArrayBuffer;
}
