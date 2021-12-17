export const getUserOAuthCode = () => {
  return new URLSearchParams(window.location.search).get('code');
};
