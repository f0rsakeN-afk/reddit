import argon2 from "argon2";

export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,

      memoryCost: 19 * 1024,
      timeCost: 2,
      parallelism: 1,

      hashLength: 32,
    });
  }

  async verifyPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    try {
      return await argon2.verify(passwordHash, password);
    } catch (error) {
      return false;
    }
  }
}

export const passwordService = new PasswordService();
