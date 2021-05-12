import React, {Component} from 'react';
import * as styles from './App.module.css';
import {connect} from 'react-redux';

import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';
import TierChecker from './containers/Calculator/TierChecker/TierChecker';
import MinionChecker from './containers/Calculator/MinionChecker/MinionChecker';
import TypeChecker from './containers/Calculator/TypeChecker/TypeChecker';
import ProbabilityCalculator from './containers/Calculator/ProbabilityCalculator/ProbabilityCalculator';

class App extends Component {
  componentDidMount() {
    this.props.getAccessToken();
  }

  render() {
    let calculatorComponent = null;
    let buttons = null;

    if (this.props.init === false) {
      calculatorComponent = (
        <div>
          <p>Click this button to begin.</p>
          <button onClick={() => this.props.onInitCalculator()}>Click me.</button>
        </div>
      );
    }

    if (this.props.init === true && this.props.typesConfirmed === false) {
      calculatorComponent = (<TypeChecker />)
    }

    if (this.props.typesConfirmed === true) {
      buttons = (<button onClick={() => this.props.onConfirmTypes()}>RESET MINION TYPES</button>);
      calculatorComponent = (<TierChecker />);
    }

    if (this.props.tier !== null) {
      buttons = (
        <div>
          <button onClick={() => this.props.onConfirmTypes()}>RESET MINION TYPES</button>
          <button onClick={() => this.props.onResetTier()}>RESET TAVERN TIER</button>
        </div>)
      calculatorComponent = (<MinionChecker />)
    }

    if (this.props.confirmedMinions === true) {
      calculatorComponent = <ProbabilityCalculator selectedMinions={this.props.chosenMinions} minions={this.props.minions}/>
    }
    
    if (this.props.error) {
      calculatorComponent = (<p>Sorry, an error has occured. Please refresh the page.</p>);
    }

    return (
      <div className="App">
        <header className={styles.AppHeader}>
          <p>HEARTHSTONE BATTLEGROUNDS TRIPLE CHECKER</p>
          {buttons}
        </header>
        <div className={styles.Calculator}>
          <div className={styles.CalculatorContent}>
            {calculatorComponent}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.api.access_token,
    error: state.api.error,
    typesConfirmed: state.calc.typesConfirmed,
    init: state.calc.init,
    tier: state.calc.tier,
    minions: state.calc.minions,
    chosenMinions: state.calc.selectedMinions,
    confirmedMinions: state.calc.minionsConfirmed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAccessToken: () => dispatch(actions.getAccessToken()),
    onInitCalculator: () => dispatch(actions.initCalculator()),
    onConfirmTypes: () => dispatch(actions.confirmTypes()),
    onResetTier: () => dispatch(actions.resetTier())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);