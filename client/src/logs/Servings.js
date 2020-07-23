import React from 'react';
import styled from 'styled-components';

const ServingsContainer = styled.div``;

const Servings = (props) => {
  return (
    <ServingsContainer>
      <div>Goals: {props.goals}</div>
      <div>Completed: {props.completed}</div>
    </ServingsContainer>
  );
};

export default Servings;
