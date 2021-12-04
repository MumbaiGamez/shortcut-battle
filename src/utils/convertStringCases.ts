type obj = {
  [key: string]: string | number;
};

export const convertStringToSnakeCase = (str: string) => {
  return str
    .replace(/\.?([A-Z-]+)/g, (x, y) => {
      return '_' + y.toLowerCase();
    })
    .replace(/^_/, '')
    .replace(/-/g, '');
};

export const convertObjectKeysToSnakeCase = (obj: obj) => {
  const newObj: obj = {};

  Object.keys(obj).forEach((key) => {
    newObj[convertStringToSnakeCase(key)] = obj[key];
  });

  return newObj;
};

export const convertStringToCamelCase = (str: string) => {
  return str.replace(/^([A-Z])|_([a-z])|-([a-z])/g, (w, x, y, z) => {
    if (x) {
      return x.toLowerCase();
    }
    if (y) {
      return y.toUpperCase();
    }
    if (z) {
      return z.toUpperCase();
    }
  });
};

export const convertObjectKeysToCamelCase = (obj: obj) => {
  const newObj: obj = {};

  Object.keys(obj).forEach((key) => {
    newObj[convertStringToCamelCase(key)] = obj[key];
  });

  return newObj;
};
