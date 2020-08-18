import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useField } from 'formik';

import Button from 'shared/Button';
import { ReactComponent as MinusSVG } from 'shared/SVG/minus.svg';
import { ReactComponent as PlusSVG } from 'shared/SVG/plus.svg';

const MinusSign = styled(MinusSVG)`
  stroke: ${({ theme }) => theme.colors.darkBrown};
  width: 0.8rem;
`;

const PlusSign = styled(PlusSVG)`
  stroke: ${({ theme }) => theme.colors.darkBrown};
  stroke-width: 1px;
  width: 0.9rem;
`;

/**
 * type="button" is essential to prevent the buttons from submitting by default
 * within the containing form.
 */
const DecrementButton = styled(Button).attrs({ type: 'button' })`
  border: none;
  border-radius: 4px 0 0 4px;
  padding: 0px;
  width: 2rem;

  &:active {
    ${MinusSign} {
      stroke-width: 2px;
      transition: stroke-width 150ms;
    }
  }
`;

const IncrementButton = styled(DecrementButton)`
  border-radius: 0 4px 4px 0;

  &:active {
    ${PlusSign} {
      stroke-width: 1.5px;
      transition: stroke-width 150ms;
    }
  }
`;

const InputContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.darkBrown};
  border-radius: 4px;
  display: inline-flex;
  font-size: 1rem;
  justify-content: space-between;
  height: 1.5rem;
  width: 6rem;
`;

const InputValue = styled.span`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightestBeige};
  border-color: ${({ theme }) => theme.colors.darkBrown};
  border-style: none solid;
  border-width: 0 1px;
  display: flex;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  justify-content: center;
  width: 4rem;
`;

/**
 * Custom "input" that renders a given number that is adjustable through
 * the increment and decrement buttons.
 *
 * Is always used with Formik, which passes the initial values.
 */
const NumericInput = (props) => {
  /**
   * Important: Even though field is not used directly, it must be included
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

  return (
    <InputContainer>
      <DecrementButton onClick={decrementValue}>
        <MinusSign />
      </DecrementButton>
      <InputValue>{value}</InputValue>
      <IncrementButton onClick={incrementValue}>
        <PlusSign />
      </IncrementButton>
    </InputContainer>
  );
};

NumericInput.propTypes = {
  /**
   * The name that will be used to reference the NumericalInput data when the
   * Formik form is submitted.
   */
  name: PropTypes.string.isRequired,
};

export default NumericInput;
