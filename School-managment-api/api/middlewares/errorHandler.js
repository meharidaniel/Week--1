module.exports = (error, req, res, next) => {
    res.status(error.satus || 500);
    res.json({
        error: {
            message: error.message
        }
    });
}