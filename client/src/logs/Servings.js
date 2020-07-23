import React from 'react';
import styled from 'styled-components';

import Checkbox from './Checkbox';

const ServingsContainer = styled.div``;

//TODO: This will become "updateCount"
const handleChange = (event) => {
  console.log(event.target.checked);
};

const Servings = (props) => {
  const boxes = [];
  for (let i = 0; i < props.goals; i++) {
    let key = i.toString();

    //default checked, enabled
    if (i < props.completed - 1) {
      boxes.push(<Checkbox key={key} checked={true} readOnly={true} />);
    }
    //default checked; enabled
    else if (i === props.completed - 1) {
      boxes.push(
        <Checkbox key={key} defaultChecked={true} onChange={handleChange} />
      );
    }
    //default unchecked; enabled
    else if (i === props.completed) {
      boxes.push(
        <Checkbox key={key} defaultChecked={false} onChange={handleChange} />
      );
    }
    //else unchecked & disabled
    else {
      boxes.push(<Checkbox key={key} checked={false} readOnly={true} />);
    }
  }

  return <ServingsContainer>{boxes}</ServingsContainer>;
};

export default Servings;
