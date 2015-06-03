var React            = require('react');
var PlanResultState  = require('./PlanResultState');

var PlanResult = React.createClass({
    render() {
    	var viewBaseUrl = this.props.baseUrl + '/browse/';
    	var viewPlanResultUrl = viewBaseUrl + this.props.planResult.buildResultKey;
        return (
            <tr className="table__row">
                <td className="table__cell"><PlanResultState state={ this.props.planResult.state } /></td>
                <td className="table__cell"><a href={ viewPlanResultUrl }>{ this.props.planResult.plan.shortName }</a></td>
            </tr>
        );
    }
});

module.exports = PlanResult;