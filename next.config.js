const withImages = require('next-images');
module.exports = withImages();

module.exports = {
    ...module.exports,
    i18n: {
        locales: [
            'en',
            'ar',
            'ch',
            'de',
            'es',
            'fr',
            'it',
            'nl',
            'no',
            'pl',
            'sw',
            'tr',
            'pt',
            'ru',
        ],
        defaultLocale: 'en',
    },
};
