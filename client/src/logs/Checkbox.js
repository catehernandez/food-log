import React from 'react';
import styled from 'styled-components';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div`
  cursor: ${(props) => (props.readOnly ? 'auto' : 'pointer')};
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? 'salmon' : 'papayawhip')};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
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
const Checkbox = ({ checked, ...props }) => (
  <label>
    <CheckboxContainer>
      <StyledCheckbox checked={checked} readOnly={props.readOnly}>
        <HiddenCheckbox checked={checked} {...props} />
      </StyledCheckbox>
    </CheckboxContainer>
  </label>
);

export default Checkbox;
