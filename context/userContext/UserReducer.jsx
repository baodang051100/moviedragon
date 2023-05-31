export const UsersReducer = (state, action) => {
    switch (action.type) {
        //GET
        case "GET_USERS_START":
            return {
                users: [],
                isFetching: true,
                error: false,
            };
        case "GET_USERS_SUCCESS":
            return {
                users: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_USERS_FAILURE":
            return {
                users: [],
                isFetching: false,
                error: true,
            };
        //DELETE
        case "DELETE_USER_START":
            return {
                ...state,
                isFetching: false,
                error: false,
            };
        case "DELETE_USER_SUCCESS":
            return {
                users: state.users.filter((user) => user._id !== action.payload),
                isFetching: false,
                error: false,
            };
        case "DELETE_USER_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};