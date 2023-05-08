export function clone<T>(object: T): T {
  return JSON.parse(JSON.stringify(object)) as T;
}

export function generateRandomKey(): string {
  const AVAILABLE_CHARACTERS: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  let result: string = "";

  for (let i = 0; i < AVAILABLE_CHARACTERS.length; i++) {
    const randomIndex: number = Math.floor(
      Math.random() * AVAILABLE_CHARACTERS.length
    );
    result += AVAILABLE_CHARACTERS.charAt(randomIndex);
  }

  return result;
}
