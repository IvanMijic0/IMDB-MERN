export const isTokenExpired = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000;
    return Date.now() >= expirationTime;
};

export const isAuthenticated = (token) => {
    return token && !isTokenExpired(token);
};