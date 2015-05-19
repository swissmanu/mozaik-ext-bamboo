var React            = require('react');

var PlanResult = React.createClass({
    render() {
        return (
            <tr className="table__row">
                <td className="table__cell">{ this.props.planResult.state }</td>
                <td className="table__cell">{ this.props.planResult.plan.shortName }</td>
            </tr>
        );
    }
});

module.exports = PlanResult;