import * as styles from './Minion.module.css';

const minion = (props) => {
  return (
    <div>
      <img className={styles.MinionImage} src={props.image} alt={props.name} onClick={props.clicked}/>
      <p>{props.name}</p>
    </div>
  );
}

export default minion;