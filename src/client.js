var request = require('request-promise');
var config  = require('./config');
var Promise = require('bluebird');
var chalk   = require('chalk');

/**
 * @param {Mozaik} mozaik
 */
var client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildRequest(path, json = true) {
        var url = config.get('bamboo.baseUrl') + path;

        mozaik.logger.info(chalk.yellow(`[bamboo] fetching from ${ url }`));

        return request.get({
            url: url
            , json: json
            , auth: {
                username: config.get('bamboo.auth.user')
                , password: config.get('bamboo.auth.password')
            }
        }).catch((reason)=>{
            mozaik.logger.info(chalk.red(`[bamboo] request failed: ${reason}`));
        });
    }

    function getAgents(html, agentIds){

        function extractAgents(html){
            var regex = /agent\/viewAgent\.action\?agentId=(\d+)('|")>([\s\w\(\).]+)<\/a>/gi;
            var match = regex.exec(html);
            var agents = [];
            while(match != null){
                agents.push({
                    id: match[1],
                    name: match[3]
                });
                match = regex.exec(html);
            }
            return agents;
        }

        function extractStates(html){
            var regex = /class=.agentStatus.><img src=.[-\/\w\d\.]+. alt=.(\w+)/gi;
            var match = regex.exec(html);
            var states = [];
            while(match != null){
                states.push(match[1].toLowerCase());
                match = regex.exec(html);
            }
            return states;
        }

        var agents = extractAgents(html);
        var states = extractStates(html);
        var completeAndFilteredAgents = states
            .map((state, idx)=>{
                agents[idx].state = state.toLowerCase();
                return agents[idx];
            })
            .filter((agent)=>{
                return agentIds.indexOf(agent.id) > -1;
            });

        return completeAndFilteredAgents;
    }

    return {
        plan_results(parameters) {
            var planIds = parameters.planIds
                , requests = planIds.map((planId)=>{
                    return buildRequest('/rest/api/latest/result/' + planId + '.json?max-result=1')
                });

            return Promise.all(requests)
                .then((responses)=>{
                    return responses.map(function(response) {
                        return response.results.result[0];
                    });
                }).catch(console.error);
        }
        , agents(parameters) {
            var agentIds = parameters.agentIds
                , request = buildRequest('/agent/viewAgents.action', false);

            return request.then((response)=>{
               return getAgents(response, agentIds);
            }).catch(console.error);
        }
    };
};




module.exports = client;