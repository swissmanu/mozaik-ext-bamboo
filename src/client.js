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

    function getAgents(html, agentIds){

        function extractAgents(html){
            //html = "<a href='/bamboo/admin/agent/viewAgent.action?agentId=229638145'>IBClassic Build Agent</a>";
            var regex = /agent\/viewAgent\.action\?agentId=(\d+)('|")>([\s\w]+)<\/a>/gi;
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
            // html = <td class="agentStatus"><img src="/bamboo/images/iconsv4/icon-agent.png" alt="Idle">Idle</td>
            var regex = /class=.agentStatus.><img src=.[-\\/\w\d\.]+. alt=.(\w+).>/gi;
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
        return agents
            .map((agent, idx)=>{
                agent.state = states[idx].toLowerCase();
                return agent;
            })
            .filter((agent)=>{
                return agentIds.indexOf(agent.id) !== -1;
            });
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
        , agents(parameters) {
            var agentIds = parameters.agentIds
                //request = [{body: '<tr class="agentIdle"><td><a href="/bamboo/admin/agent/viewAgent.action?agentId=229638145">IBClassic Build Agent</a> <span class="lozenge lozenge-default lozenge-subtle" title="dedicated">dedicated</span></td><td class="agentStatus"><img src="/bamboo/images/iconsv4/icon-agent.png" alt="Idle">Idle</td></tr><tr class="agentIdle"><td><a href="/bamboo/admin/agent/viewAgent.action?agentId=229638146">IBK Build Agent</a> <span class="lozenge lozenge-default lozenge-subtle" title="dedicated">dedicated</span></td><td class="agentStatus"><img src="/bamboo/images/iconsv4/icon-agent.png" alt="Idle">Idle</td></tr>', status: 200, code:200}];
                , request = buildRequest('/agent/viewAgents.action');

            return Promise.all(request).then(function(response) {
               return getAgents(response[0].body, agentIds);
            });
        }
    };
};




module.exports = client;