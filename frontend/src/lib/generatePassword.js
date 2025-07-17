const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

const getRandomValues = (array, count) => {
  const result = new Uint32Array(count);
  window.crypto.getRandomValues(result);
  return Array.from(result).map(val => array[val % array.length]);
};

export const generatePassword = (options) => {
  const { length, useNumbers, useSymbols } = options;
  let charPool = lower + upper;
  let guaranteedChars = [];

  guaranteedChars.push(...getRandomValues(lower, 1));
  guaranteedChars.push(...getRandomValues(upper, 1));

  if (useNumbers) {
    charPool += numbers;
    guaranteedChars.push(...getRandomValues(numbers, 1));
  }
  if (useSymbols) {
    charPool += symbols;
    guaranteedChars.push(...getRandomValues(symbols, 1));
  }

  const remainingLength = length - guaranteedChars.length;
  const randomChars = getRandomValues(charPool, remainingLength);
  
  const shuffledPassword = [...guaranteedChars, ...randomChars]
    .sort(() => 0.5 - Math.random()) 
    .join('');

  return shuffledPassword;
};