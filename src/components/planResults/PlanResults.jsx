var React            = require('react');
var Reflux           = require('reflux');
var ApiConsumerMixin = require('mozaik/browser').Mixin.ApiConsumer;
var PlanResultsList  = require('./PlanResultsList');

var PlanResults = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    propTypes: {
        planIds: React.PropTypes.array.isRequired
    },

    getInitialState() {
        return {
            planResults: null
        };
    },

    getApiRequest() {
        return {
            id: 'bamboo.plan_results',
            params: {
                planIds: this.props.planIds
            }
        };
    },

    onApiData(planResults) {
        this.setState({
            planResults: planResults.results
            , baseUrl: planResults.baseUrl
        });
    },

    render() {
        var titleNode = (
            <span>
                Bamboo <span className="widget__header__subject">Build Plans</span>
            </span>
        );
        if (this.props.title) {
            titleNode = this.props.title;
        }

        var planResultsListNode = null;
        if (this.state.planResults) {
            planResultsListNode = <PlanResultsList planResults={ this.state.planResults } baseUrl={this.state.baseUrl} />
        }

        return (
            <div>
                <div className="widget__header">
                    { titleNode }
                    <i className="fa fa-eye" />
                </div>
                <div className="widget__body">
                    { planResultsListNode }
                </div>
            </div>
        );
    }
});

module.exports = PlanResults;