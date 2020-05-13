require('dotenv').config();

module.exports = {
    env: {
        NEXT_CRAFT_API_TOKEN: process.env.NEXT_CRAFT_API_TOKEN,
        NEXT_CRAFT_API_URL: process.env.NEXT_CRAFT_API_URL,
    },
};
