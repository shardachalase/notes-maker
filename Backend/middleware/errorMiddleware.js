const notfound = (req, res, next) => {
    const error = new Error(`-Not Found-${req.originalurl}`);
    res.status(404);
    next(error);
}
const handleerror = (error, req, res, next) => {
    const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack
    })
}
export { notfound, handleerror };