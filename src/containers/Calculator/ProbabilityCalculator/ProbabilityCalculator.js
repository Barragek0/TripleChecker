import React from 'react';

import {tripleProbabilityCalculator} from '../../../utilities/factorialFunctions';

const probabilityCalculator = (props) => {
  return (
    <p>Your probability of getting a desirable minion is {tripleProbabilityCalculator(props.minions.length, props.selectedMinions.length)}.</p>
  );
}

export default probabilityCalculator;