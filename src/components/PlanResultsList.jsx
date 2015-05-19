var React            = require('react');
var PlanResult       = require('./PlanResult');

var PlanResultsList = React.createClass({
    render() {
        var planResultNodes = this.props.planResults.map(planResult => {
            return <PlanResult planResult={ planResult } key={ planResult.id } />
        });
        
        return (
            <table className="table">
                <thead>
                    <tr className="table__row table__row--head">
                        <th className="table__cell table__cell--head"></th>
                        <th className="table__cell table__cell--head">Plan</th>
                    </tr>
                </thead>
                { planResultNodes }
            </table>
        );
    }
});

module.exports = PlanResultsList;