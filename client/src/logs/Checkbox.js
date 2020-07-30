import React from 'react';
import styled, { css } from 'styled-components';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div`
  border: 1px solid #c4c4c4;
  background-color: ${(props) => (props.checked ? '#c4c4c4' : 'none')};
  cursor: ${(props) => (props.readOnly ? 'auto' : 'pointer')};
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${(props) =>
    props.className === 'veg_count' &&
    css`
      border: 1px solid ${(props) => props.theme.colors.green};
      background-color: ${(props) =>
        props.checked ? props.theme.colors.green : 'none'};
    `}
  ${(props) =>
    props.className === 'fruit_count' &&
    css`
      border: 1px solid ${(props) => props.theme.colors.pink};
      background-color: ${(props) =>
        props.checked ? props.theme.colors.pink : 'none'};
    `}
  ${(props) =>
    props.className === 'protein_count' &&
    css`
      border: 1px solid ${(props) => props.theme.colors.darkBlue};
      background-color: ${(props) =>
        props.checked ? props.theme.colors.darkBlue : 'none'};
    `}
  ${(props) =>
    props.className === 'grain_count' &&
    css`
      border: 1px solid ${(props) => props.theme.colors.gold};
      background-color: ${(props) =>
        props.checked ? props.theme.colors.gold : 'none'};
    `}
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
      <StyledCheckbox checked={checked} {...props}>
        <HiddenCheckbox checked={checked} {...props} />
      </StyledCheckbox>
    </CheckboxContainer>
  </label>
);

export default Checkbox;
