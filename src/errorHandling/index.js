const errorCodeToHumanReadable = (erroCode) => {
    switch (erroCode) {
        case "ENOENT":
            return "File or directory not found";

        case "ECONNREFUSED":
            return "Connection refused";

        case "ECONNRESET":
            return "Connection reset";
        
        case "ETIMEDOUT":
            return "Request timed out";
        
        default:
            return "An error occurred";
    }
}

module.exports = {
    errorCodeToHumanReadable
}
