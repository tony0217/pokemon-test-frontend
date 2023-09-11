export function getAccessToken() {
  const storedUserInfo = localStorage.getItem('userInfo');
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  return userInfo?.token || '';
}
