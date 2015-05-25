var React            = require('react');
var Agent       = require('./Agent');

var AgentsList = React.createClass({
    render() {
        var agentNodes = this.props.agents.map(agent => {
            return <Agent agent={ agent } key={ agent.id } />
        });

        return (
            <table className="table">
                <thead>
                    <tr className="table__row table__row--head">
                        <th className="table__cell table__cell--head"></th>
                        <th className="table__cell table__cell--head">Agent</th>
                    </tr>
                </thead>
                { agentNodes }
            </table>
        );
    }
});

module.exports = AgentsList;