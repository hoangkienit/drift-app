export const validateLogin = (username, password, t) => {
  if (!username || !password) {
    return t('authentication.signin.error_empty_fields');
  }
  
  // Check if the password meets the minimum length
  if (password.length < 6) {
    return t('authentication.signin.error_short_password');
  }
  
  // Password strength validation (must contain at least one number, one uppercase letter, and one special character)
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
  if (!passwordRegex.test(password)) {
    return t('authentication.signin.error_password_strength');
  }
  
  return null;
};

// Function to validate the registration form
export const validateRegister = (email, username, password, confirmPassword, t) => {
  if (!email || !username || !password || !confirmPassword) {
    return t('authentication.signup.error_empty_fields');
  }
  
  // Email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return t('authentication.signup.error_invalid_email');
  }
  
  // Check if the password meets the minimum length
  if (password.length < 6) {
    return t('authentication.signup.error_short_password');
  }

  // Password strength validation (must contain at least one number, one uppercase letter, and one special character)
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
  if (!passwordRegex.test(password)) {
    return t('authentication.signup.error_password_strength');
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return t('authentication.signup.error_password_mismatch');
  }
  
  return null;
};
