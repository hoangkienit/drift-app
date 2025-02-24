const en = require("../locales/en.json");
const vi = require("../locales/vi.json");

const messages = { en, vi };

const getMessage = (key, lang = "en", fallbackMessage = "Unknown error") => {
    return messages[lang]?.[key] || fallbackMessage || messages["en"][key] || "Unknown error";
};

module.exports = getMessage;
