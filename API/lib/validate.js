const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

const isValidRating = (rating) => {
  const n = parseInt(rating);
  return !isNaN(n) && n >= 1 && n <= 5;
};

module.exports = { isValidEmail, isStrongPassword, isValidRating }; 