import loadIcon from '../../../../../utilities/tierIconLoader';
import * as styles from './TierIcon.module.css';

const tierIcon = (props) => {
  return (
    <div className={styles.TierIcon}>
      <img className={styles.TierIconImg} src={loadIcon(props.tier)} alt="tierIcon"/>
    </div>
  );
}

export default tierIcon;