// vuex-persist.js

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('vuex-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('vuex-state', serializedState);
  } catch (error) {
    // Handle errors here, if needed
  }
};
