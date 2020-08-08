import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const TextInputLabel = styled.label`
  font-size: 0.8rem;
  padding: 0 0.5rem;
  opacity: 1;
  transition: all 150ms;

  ${(props) =>
    props.invisible &&
    css`
      opacity: 0;
    `}
`;

TextInputLabel.propTypes = {
  /**
   * Optional prop to determine visibility of the label.
   */
  invisible: PropTypes.bool,
};

export default TextInputLabel;
