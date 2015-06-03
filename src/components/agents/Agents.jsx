var React            = require('react');
var Reflux           = require('reflux');
var ApiConsumerMixin = require('mozaik/browser').Mixin.ApiConsumer;
var AgentsList       = require('./AgentsList');

var Agents = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        agentIds: React.PropTypes.array.isRequired
    },

    getInitialState() {
        return {
            agents: null
        };
    },

    getApiRequest() {
        return {
            id: 'bamboo.agents',
            params: {
                agentIds: this.props.agentIds
            }
        };
    },

    onApiData(agents) {
        this.setState({
            agents: agents
        });
    },

    render() {
        var titleNode = (
            <span>
                Bamboo <span className="widget__header__subject">Agents</span>
            </span>
        );
        if (this.props.title) {
            titleNode = this.props.title;
        }

        var agentsListNode = null;
        if (this.state.agents) {
            agentsListNode = <AgentsList agents={ this.state.agents } />
        }

        return (
            <div>
                <div className="widget__header">
                    { titleNode }
                    <i className="fa fa-eye" />
                </div>
                <div className="widget__body">
                    { agentsListNode }
                </div>
            </div>
        );
    }
});

module.exports = Agents;