var React            = require('react');
var AgentState  = require('./AgentState');

var Agent = React.createClass({
    render() {
        return (
            <tr className="table__row">
                <td className="table__cell"><AgentState state={ this.props.agent.state } /></td>
                <td className="table__cell">{ this.props.agent.name }</td>
            </tr>
        );
    }
});

module.exports = Agent;