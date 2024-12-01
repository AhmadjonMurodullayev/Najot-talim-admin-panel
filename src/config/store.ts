export function loadState<T>(key: string): T | undefined {
  try {
    const serializedState = localStorage.getItem(key);

    if (!serializedState) return undefined;

    return JSON.parse(serializedState) as T;
  } catch (e) {
    console.error("Error loading state:", e);
    return undefined;
  }
}

export function saveState<T>(key: string, state: T): void {
  try {
    console.log("Saving state:", state);
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.error("Error saving state:", e);
  }
}
