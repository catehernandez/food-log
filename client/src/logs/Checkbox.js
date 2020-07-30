import React from 'react';
import styled from 'styled-components';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div`
  border: 1px solid ${({ color, theme }) => theme.colors[color]};
  background-color: ${({ checked, color, theme }) =>
    checked ? theme.colors[color] : 'none'};
  cursor: ${({ readOnly }) => (readOnly ? 'auto' : 'pointer')};
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  transition: all 150ms;
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding: 0.5rem;
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
      <StyledCheckbox checked={checked} color={color} {...props}>
        <HiddenCheckbox checked={checked} {...props} />
      </StyledCheckbox>
    </CheckboxContainer>
  </label>
);

export default Checkbox;
