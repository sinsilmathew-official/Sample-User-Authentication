const httperror = require('http-errors');
function throwError(errorCode, errorMessage) {
    throw new httperror(errorCode, errorMessage);
}
module.exports.throwError = throwError;