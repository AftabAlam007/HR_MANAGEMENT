// This file simulates your user database.
// In a real app, this data would come from an API.

export const usersDB = {
  'admin@workbridge.com': {
    email: 'admin@workbridge.com',
    password: '123456',
    role: 'admin',
    requiresPasswordChange: false, // Admin doesn't need to change
  },
  'hr@workbridge.com': {
    email: 'hr@workbridge.com',
    password: '123456',
    role: 'hr',
    requiresPasswordChange: false,
  },
  'user@workbridge.com': {
    email: 'user@workbridge.com',
    password: '123456',
    role: 'user',
    requiresPasswordChange: false,
  },
  // --- EXAMPLE OF A NEWLY CREATED USER ---
  'new.user@example.com': {
    email: 'new.user@example.com',
    password: 'temporarypassword', // The temporary password set by admin
    role: 'user',
    requiresPasswordChange: true, // The crucial flag
  }
};