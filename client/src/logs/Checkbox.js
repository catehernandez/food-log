import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//Remove default checkbox styling
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

// Checked fill style.
const StyledCheckFill = styled.div`
  background-color: ${({ color, theme }) => theme.colors[color]};
  border-radius: 50%;
  height: inherit;
  position: relative;
  width: inherit;
  /* Translate -1% makes it appear actually centered--some strange visual trick */
  transform: scale(0.85) translate(0%, -1%);
`;

// Styled checkbox to replace the native component.
const StyledCheckbox = styled.div`
  border: ${({ checked }) => (checked ? '1px' : '1.5px')} solid
    ${({ color, theme }) => theme.colors[color]};
  border-radius: 100%;
  cursor: ${({ readOnly }) => (readOnly ? 'auto' : 'pointer')};
  display: inline-block;
  height: 18px;
  transition: all 150ms;
  width: 18px;

  ${StyledCheckFill} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;

// Container that wraps both hidden and styled checkboxes.
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding: 0 0.5rem;
`;

/**
 * Function to render a custom checkbox.
 *
 * Must be wrapped by a label to render hidden, underlying checkbox input clickable.
 *
 * @author Cole Bemis       https://bit.ly/3f9rhuC
 */
const Checkbox = ({ checked, color = 'lightBlue', ...props }) => (
  <label>
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked} color={color} {...props}>
        <StyledCheckFill color={color} />
      </StyledCheckbox>
    </CheckboxContainer>
  </label>
);

/**
 * One of onChange or readOnly is required. React will throw warning if you
 * provide neither or both.
 */
Checkbox.propTypes = {
  /** Required boolean to determine checkbox initial state. */
  checked: PropTypes.bool.isRequired,
  /** Optional to set custom checkbox color. */
  color: PropTypes.string,
  /** Function to determine behavior when a Checkbox is clicked. */
  onChange: PropTypes.func,
  /** Function that determines if a Checkbox is unmodifiable. */
  readOnly: PropTypes.bool,
};

export default Checkbox;
