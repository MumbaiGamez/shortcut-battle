export const getVar = (
  name: string,
  element: HTMLElement = document.documentElement
) => getComputedStyle(element).getPropertyValue(name);

export const setVar = (
  name: string,
  value: string,
  element: HTMLElement = document.documentElement
) => {
  element.style.setProperty(name, value);
};
