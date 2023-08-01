export const validatePassword = (password) => {
    // password regex
    // Password should be at least 8 characters long and contain at least 1 letter, 1 number, 1 capital letter, and 1 small letter
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  export  const validateName = (name) => {
    // name regex
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  export  const validateMobile = (mobile) => {
    // mobile regex
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };
 export const validateEmail = (email) => {
    // email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

