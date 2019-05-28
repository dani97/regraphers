export const ERROR_TYPE = 'error';
export const SUCCESS_TYPE = 'success';
export const WARNING_TYPE = 'warning';


export const getMessage = (message, type) => ({
    id: new Date().getTime(),
    type: type,
    value: message
})