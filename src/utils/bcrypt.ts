import bcrypt from "bcrypt";

export const hashed = async (plaintext: string): Promise<string> => {
  return new Promise<string>((resolve) => {
    bcrypt.hash(plaintext, 13, function (err, hash) {
      if (err) throw err;
      else resolve(hash);
    });
  });
};

export const verifyBcrypt = async (
  plaintext: string,
  hash: string
): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    bcrypt.compare(plaintext, hash, function (err, result) {
      if (err) throw err;
      else resolve(result);
    });
  });
};
