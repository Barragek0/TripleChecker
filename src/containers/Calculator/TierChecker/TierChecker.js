import {connect} from 'react-redux';
import * as styles from "./TierChecker.module.css";
import Tier from './Tier/Tier';
import * as actions from '../../../store/actions/index';


const possibleTiers = [1,2,3,4,5,6]

const tierChecker = (props) => {
  const tierSelectHandler = (selectedTier) => {
    props.newOnSelectTier(selectedTier, props.unavailableTypes);
    props.onSetTier(selectedTier);
  }

  const tiers = possibleTiers.map(tierToRender => (
    <Tier key={tierToRender} num={tierToRender} clicked={() => tierSelectHandler(tierToRender)}/>
  ))
  return (
    <div>
      <h2>Please select your current tavern tier.</h2>
      <div className={styles.Tiers}>
        {tiers}
      </div> 
    </div>
  );
}

const mapStateToProps = state => {
  return {
    error: state.api.error,
    unavailableTypes: state.calc.unavailableTypes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectTier: (selectedTier, minionTypes) => dispatch(actions.getMinionData(selectedTier, minionTypes)),
    newOnSelectTier: (selectedTier, unavailableMinionTypes) => dispatch(actions.newGetMinionData(selectedTier, unavailableMinionTypes)),
    onSetTier: (selectedTier) => dispatch(actions.setTier(selectedTier))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(tierChecker);