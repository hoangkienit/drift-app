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

export const validateMerchantRegister = (
  restaurantName,
  restaurantDescription,
  houseNumber,
  streetName, t) => {
  if (!restaurantName || !restaurantDescription || !houseNumber || !streetName) {
    return t('authentication.signup.error_empty_fields');
  }
  
  const vietnameseRegex = /^[a-zA-ZÀ-ỹ0-9&\-\s]+$/u; // Supports Vietnamese characters
  if (!vietnameseRegex.test(restaurantName)) {
    return t('merchant.create_restaurant.error_invalid_restaurant_name');
  }

  const descriptionRegex = /^[a-zA-ZÀ-ỹ0-9\s]+$/u; // Supports Vietnamese characters
  if (!descriptionRegex.test(restaurantDescription)) {
    return t('merchant.create_restaurant.error_invalid_restaurant_description');
  }

  const houseNumberRegex = /^[a-zA-ZÀ-ỹ0-9\s\/]+$/u; // Supports Vietnamese characters
  if (!houseNumberRegex.test(houseNumber)) {
    return t('merchant.create_restaurant.error_invalid_house_number');
  }

  const streetNameRegex = /^[a-zA-ZÀ-ỹ\s]+$/u; // Supports Vietnamese characters
  if (!streetNameRegex.test(streetName)) {
    return t('merchant.create_restaurant.error_invalid_street_name');
  }
  
  return null;
};

