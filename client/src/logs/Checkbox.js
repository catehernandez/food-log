import React from 'react';
import styled from 'styled-components';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

// translate -1% makes it appear actually centered--some strange visual trick
const StyledCheckFill = styled.div`
  background-color: ${({ color, theme }) => theme.colors[color]};
  border-radius: 50%;
  height: inherit;
  position: relative;
  width: inherit;
  transform: scale(0.85) translate(0%, -1%);
`;

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

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding: 0 0.5rem;
`;

/**
 * Function to render a custom checkbox.
 *
 * @author Cole Bemis       https://bit.ly/3f9rhuC
 * @param {Object}  props   destructured props. Checked is a required field but
 *                          all others are optional.
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

export default Checkbox;
