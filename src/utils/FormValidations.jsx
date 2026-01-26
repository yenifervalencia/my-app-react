export const IsValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const IsValidOtp = (otp) =>
    /^\d{6}$/.test(otp);