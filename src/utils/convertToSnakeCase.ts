type obj = {
  [key: string]: string;
};

export const convertStringToSnakeCase = (str: string) => {
  return str
    .replace(/\.?([A-Z]+)/g, (x, y) => {
      return '_' + y.toLowerCase();
    })
    .replace(/^_/, '');
};

export const convertObjectKeysToSnakeCase = (obj: obj) => {
  const newObj: obj = {};

  Object.keys(obj).forEach((key) => {
    newObj[convertStringToSnakeCase(key)] = obj[key];
  });

  return newObj;
};
