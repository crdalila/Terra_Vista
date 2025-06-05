//===============================================================================
// name: passwordChecking.ts
// desc: Code for checking of password : it needs to have an upper and lower case,
//  a number, a symbol and at least 8 characters 
//===============================================================================
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;

export function isPasswordCorrect(password : string) {
  if (!pwdRegex.test(password)) return false;
  return true;
}