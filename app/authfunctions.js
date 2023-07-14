const usernameRegex = /^[A-z][A-z0-9-_]{3,23}$/;
const emailRegex = /^[\w-\.]+@([\w-]{2,}\.)+[\w-]{2,4}$/;
const atleastOneSpecial = /.*[^A-Za-z 0-9]/;
const atleastOneDigit = /.*[0-9]/;
const atleastOneUpper = /.*[A-Z]/;
const atleastOneLower = /.*[a-z]/;
const length = /.{8,32}/;

export function passwordValidates (pass) {
  let count = 0;
  if (atleastOneSpecial.test(pass)) count++;
  if (atleastOneDigit.test(pass)) count++;
  if (atleastOneUpper.test(pass)) count++;
  if (atleastOneLower.test(pass)) count++;
  return count >= 3 && length.test(pass);
};

export function usernameValidates (username) {
  return usernameRegex.test(username);
};

export function emailValidates (email) {
  return emailRegex.test(email);
};