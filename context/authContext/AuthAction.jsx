export const loginStart = () => ({
    type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
    type: "LOGIN_SUCESS",
    payload: user,
});
export const loginFailure = () => ({
    type: "LOGIN_FAILURE",
});

//LOGOUT
export const logout = () => ({
    type: "LOGOUT",
});

//REGISTER
export const registerStart = () => ({
    type: "REGISTER_START",
});
export const registerSuccess = () => ({
    type: "REGISTER_SUCESS",
    payload: user,
});
export const registerFailure = () => ({
    type: "REGISTER_FAILURE",
});