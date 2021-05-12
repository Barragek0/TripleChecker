import * as styles from './Tier.module.css';
import TierIcon from './TierIcon/TierIcon';

const tier = (props) => {
  return (
    <div className={styles.Tier} onClick={props.clicked}>
      <TierIcon tier={props.num}/>
      {props.num}
    </div>
  );
}

export default tier;