export function saveUserToLocalStorage(user) {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem('user', serializedUser);
  } catch (error) {
    // Handle errors here, if needed
    console.error('Error saving user to localStorage:', error);
  }
}