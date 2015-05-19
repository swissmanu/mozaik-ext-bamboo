var request = require('superagent');
var config  = require('./config');
var Promise = require('bluebird');
var chalk   = require('chalk');
require('superagent-bluebird-promise');


/**
 * @param {Mozaik} mozaik
 */
var client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildRequest(path) {
        var url = config.get('bamboo.baseUrl') + path;

        mozaik.logger.info(chalk.yellow(`[bamboo] fetching from ${ url }`));

        return request.get(url)
            .auth(
                config.get('bamboo.auth.user'),
                config.get('bamboo.auth.password')
            )
            .promise();
    }

    return {
        plan_results(parameters) {
            var planIds = parameters.planIds
                , requests = planIds.map(function(planId) {
                    return buildRequest('/rest/api/latest/result/' + planId + '.json?max-result=1')
                });

            return Promise.all(requests)
                .then(function(responses) {
                    return responses.map(function(response) {
                        return response.body.results.result[0];
                    });
                });
        }
    };
};




module.exports = client;