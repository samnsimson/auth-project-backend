export const ERR_USER_EXISTS = {
    type: "error",
    status: 400,
    message: "User exists",
};

export const ERR_WRONG_PASSWORD = {
    type: "error",
    status: 400,
    message: "Incorrect Password",
};

export const ERR_INVALID_USER = {
    type: "error",
    status: 404,
    message: "User unavailable",
};
