var React            = require('react');

var AgentState = React.createClass({
    render() {
        var stateClasses = 'bamboo__plan-results__result__state bamboo__plan-results__result__state--'
            , iconClasses = 'fa fa-'
            , state = this.props.state.toLowerCase()

        if(state === 'idle' || state === 'building') {
            stateClasses += 'success';
            iconClasses += 'check-square';
        } else if(state === 'offline') {
            stateClasses += 'error';
            iconClasses += 'warning';
        } else{
            stateClasses += 'unknown';
            iconClasses += 'question-circle';
        }

        return (
            <span className={ stateClasses }>
                <i className={ iconClasses } />
            </span>
        );
    }
});

module.exports = AgentState;