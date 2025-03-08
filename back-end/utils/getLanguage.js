const getLanguage = (acceptLanguage) => {
    return acceptLanguage?.split(",")[0].split(";")[0].split("-")[0] || "en";
};

module.exports = getLanguage;