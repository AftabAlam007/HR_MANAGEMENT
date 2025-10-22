/**
 * Generates a strong, random password.
 *
 * @param {number} length The desired length of the password.
 * @param {boolean} useSymbols Include symbols in the password.
 * @returns {string} The generated password.
 */
export const generateStrongPassword = (length = 12) => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = lower + upper + numbers + symbols;

    let password = '';
    // Ensure the password contains at least one of each character type for strength
    password += lower[Math.floor(Math.random() * lower.length)];
    password += upper[Math.floor(Math.random() * upper.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest of the password length with random characters from the full set
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the generated password string to ensure randomness of character positions
    // This converts the string to an array, sorts it randomly, and joins it back into a string.
    return password.split('').sort(() => 0.5 - Math.random()).join('');
};