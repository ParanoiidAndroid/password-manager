import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const IV = Buffer.alloc(16, 0); // vector fijo para simplificar

export function encrypt(text) {
  const KEY = crypto.createHash('sha256').update(process.env.JWT_SECRET).digest();
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(encrypted) {
  const KEY = crypto.createHash('sha256').update(process.env.JWT_SECRET).digest();
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
