import {connect} from 'react-redux';
import * as styles from "./TypeChecker.module.css";
import * as actions from '../../../store/actions/index';
import Type from './Type/Type'; 


const typeChecker = (props) => {
  const typeSelectHandler = (selectedType) => {
    props.onClickType(selectedType)
  }

  const possibleTypes = ['MURLOC', 'BEAST', 'DRAGON', 'ELEMENTAL', 'MECH', 'PIRATE', 'DEMON'];

  let types = null;
  if (props.unavailableTypes !== null) {
  types = possibleTypes.map(typeToRender => (
    <Type key={typeToRender} availableType={!props.unavailableTypes.includes(typeToRender)} type={typeToRender} clicked={() => typeSelectHandler(typeToRender)} />
    ));
  }

  let button = (<p>Exactly 5 minion types must be selected.</p>);
  if (props.unavailableTypes.length === 2) {
    button = <button disabled={props.unavailableTypes.length !== 2} onClick={() => props.onConfirmType()}>CONFIRM TYPES</button>
  }

  return (
    <div>
      <h2>Please select your available minion types.</h2>
      <div className={styles.Types}>
        {types}
      </div> 
      {button}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    unavailableTypes: state.calc.unavailableTypes,
    typesConfirmed: state.calc.typesConfirmed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClickType: (type) => dispatch(actions.clickType(type)),
    onConfirmType: () => dispatch(actions.confirmTypes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(typeChecker);