import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

import Button from 'shared/Button';

const InputContainer = styled.div`
  border: 1px solid #444;
  border-radius: 4px;
  display: inline-flex;
  font-size: 1rem;
  justify-content: space-between;
  height: 1.5rem;
  width: 6rem;
`;

const IncrementButton = styled(Button)`
  border: none;
  border-left: inherit;
  border-radius: 0 4px 4px 0;
  padding: 0px;
  width: 2rem;
`;

const DecrementButton = styled(Button)`
  border: none;
  border-right: inherit;
  border-radius: 4px 0 0 4px;
  padding: 0px;
  width: 2rem;
`;

const InputValue = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 4rem;
`;

const NumericInput = (props) => {
  /*
   * Important! Even though field is not used directly, it must be included
   * or else useField will not work
   */
  const [field, meta, helpers] = useField(props.name);

  const { value } = meta;
  const { setValue } = helpers;

  const decrementValue = () => {
    if (value > 0) {
      setValue(value - 1);
    }
    //do nothing if value is 0 or less
  };

  const incrementValue = () => {
    if (value < 10) {
      setValue(value + 1);
    }
  };

  //type="button" prevents buttons from submitting on default within a form
  return (
    <InputContainer>
      <DecrementButton onClick={decrementValue} type="button">
        -
      </DecrementButton>
      <InputValue>{value}</InputValue>
      <IncrementButton onClick={incrementValue} type="button">
        +
      </IncrementButton>
    </InputContainer>
  );
};

export default NumericInput;