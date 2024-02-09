const isAuthenticated = () => !!localStorage.getItem('userToken');

export default isAuthenticated;
