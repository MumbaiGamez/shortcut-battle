export const getVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name);

export const setVar = (name: string, value: string) => {
  document.documentElement.style.setProperty(name, value);
};
