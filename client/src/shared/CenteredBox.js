import styled from 'styled-components';

const CenteredBox = styled.div`
  background-color: #efefef;
  border-radius: 12px;
  max-height: 340px;
  left: 50%;
  position: absolute;
  top: 17%;
  transform: translate(-50%, 17%);
  width: 340px;

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    width: 400px;
  }
`;

export default CenteredBox;
