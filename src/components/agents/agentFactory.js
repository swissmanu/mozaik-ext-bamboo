export default class AgentFactory{

    constructor($tr){
        this.$tr = $tr;
        this.agentIdRegex = /\?agentId=(\d+)/i;
    }

    getAgentId(){
        var href = this.$tr.find('td:first-child > a').attr('href')
            , matches = this.agentIdRegex.exec(href)
            , agentId = null;

        if(matches != null){
            agentId = matches[1];
        }

        return agentId;
    }

    getAgentState(){
        var stateText = this.$tr.find('td.agentStatus').text().toLowerCase()
            , state = 'offline';

        if(stateText.indexOf('building') !== -1){
            state = 'building';
        } else if(stateText.indexOf('disabled') !== -1){
            state = 'disabled';
        } else if(stateText.indexOf('idle') !== -1){
            state = 'idle';
        }
        return state;
    }

    getAgentName(){
        return this.$tr.find('td:first-child > a').text();
    }

    create(){
        var id = this.getAgentId()
            , state = this.getAgentState()
            , name = this.getAgentName();

        return { id, state, name };
    }

    static createFromRow($tr){
        return new AgentFactory($tr).create();
    }
}