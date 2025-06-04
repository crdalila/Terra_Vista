  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;

export function isPasswordCorrect(password : string) {
  //Error checking for password
  if (!pwdRegex.test(password)) return false;
  return true;
}