var convict = require('convict');

var config = convict({
    bamboo: {
        baseUrl: {
            doc:     'The Bamboo API base url.',
            default: null,
            format:  String,
            env:    'BAMBOO_API_BASE_URL'
        },
        auth: {
            user: {
                doc:     'The Bamboo API basic http auth user.',
                default: null,
                format:  String,
                env:    'BAMBOO_API_BASIC_AUTH_USER'
            },
            password: {
                doc:     'The Bamboo API basic http auth password.',
                default: null,
                format:  String,
                env:    'BAMBOO_API_BASIC_AUTH_PASSWORD'
            }
        }
    }
});

module.exports = config;