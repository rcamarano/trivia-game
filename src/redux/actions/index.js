export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';

export const updateEmail = (email) => ({
  type: UPDATE_EMAIL,
  email,
});

export const updateUsername = (userName) => ({
  type: UPDATE_USERNAME,
  userName,
});
