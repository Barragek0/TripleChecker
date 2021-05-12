import * as styles from './Type.module.css';

const type = (props) => {
  return (
    <div className={props.availableType ? styles.ActiveType : styles.InactiveType} onClick={props.clicked}>
      <p>{props.type}</p>
    </div>
  );
}

export default type;