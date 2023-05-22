import axios from "axios";
// import messages from "messages";

const client = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const setAuthHeader = (token) => {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    client.defaults.headers.common[ "xtenant" ] = 'ec8862dc-dfc9-4015-9353-23cb63400fef'
};

setAuthHeader(localStorage.getItem("token")); 

const onSuccess = function (response) {
    return response.data;
};

const onError = function (error) {
    console.error("Request Failed:", error.config);
    if (error.response) {
        // Request was made but server responded with something
        // other than 2xx
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
        if (
            error.response.data.status === 401 &&
            invalidTokenMessages.includes(error.response.data.message)
        ) {
            localStorage.removeItem("token");
            location.reload();
        }
    } else {
        // triggered the error
        console.error("Error Message:", error.message);
    }

    return Promise.reject({
        errMsg: !error?.response
            ? "Network Issue!"
            : error?.response?.data?.message
            || error?.response?.data?.errors[0].param +
            " " +
            error?.response?.data?.errors[0].msg,
        status: error?.response?.status || "not status",
    });
};

client.interceptors.response.use(onSuccess, onError);
export default client;

const invalidTokenMessages = [
    "Session has been expired!",
    "Invalid token",
    "invalid signature",
];