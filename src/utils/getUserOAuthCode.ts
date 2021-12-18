export const getUserOAuthCode = () => {
  return getLocationParams('code');
};

const getLocationParams = (paramName: string) => {
  return new URLSearchParams(window.location.search).get(paramName);
};
