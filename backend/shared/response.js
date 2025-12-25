const response = (res, statusCode, data ,status, message) => {
    const resp = { statuscode: statusCode,status:status, data: data || [], message: message || 'Success' };
    return res.status(statusCode).json(resp);
};
export {response};