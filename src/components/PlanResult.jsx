var React            = require('react');
var PlanResultState  = require('./PlanResultState');

var PlanResult = React.createClass({
    render() {
        return (
            <tr className="table__row">
                <td className="table__cell"><PlanResultState state={ this.props.planResult.state } /></td>
                <td className="table__cell">{ this.props.planResult.plan.shortName }</td>
            </tr>
        );
    }
});

module.exports = PlanResult;