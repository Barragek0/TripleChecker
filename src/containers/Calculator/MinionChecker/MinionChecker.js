import {connect} from 'react-redux';
import * as styles from "./MinionChecker.module.css";
import Minion from './Minion/Minion';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

const tierChecker = (props) => {
  let minions = (<Spinner loading="Fetching relevant minions from Blizzard API."/>);

  const getMinionImage = (minion) => {
    if (props.selectedMinions.includes(minion.id)) {
      return minion.battlegrounds.imageGold;
    } else {
      return minion.battlegrounds.image;
    }
  }

  if (props.apiResponseCount === 3) {
    const uniqueMinions = props.minions.filter((minion, index, array) => array.findIndex(t => (t.id === minion.id)) === index);
    const newUniqueMinions = props.minions.filter(minion => !props.unavailableMinions.find(unavailableMinion => unavailableMinion.id === minion.id));

    minions = newUniqueMinions.map(minionToRender => (
      <Minion key={minionToRender.id} name={minionToRender.name} image={getMinionImage(minionToRender)} clicked={() => props.onClickMinion(minionToRender.id)} />
    ));
  }

  let button = (<p>Please select at least one minion.</p>);
  if (props.selectedMinions.length > 0) {
    button = <button onClick={() => props.onConfirmMinions()}>CONFIRM MINION SELECTION</button>
  }

  return (
    <div>
      <div className={styles.selectedTier}>
        <p>Your Tavern Tier: {props.tier}</p>
      </div>
      <div className={styles.MinionChecker}>
        <span><h2>Please select your desired minions.</h2></span>
        {minions}
        {button}
      </div> 
    </div>
  );
}

const mapStateToProps = state => {
  return {
    error: state.api.error,
    apiResponseCount: state.calc.minionResponses,
    minions: state.calc.minions,
    tier: state.calc.tier,
    selectedMinions: state.calc.selectedMinions,
    unavailableMinions: state.calc.unavailableMinions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetTier: () => dispatch(actions.resetTier()),
    onClickMinion: (selectedMinionId) => dispatch(actions.clickMinion(selectedMinionId)),
    onConfirmMinions: () => dispatch(actions.confirmMinions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(tierChecker);