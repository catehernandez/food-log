import styled from 'styled-components';

import Box from 'shared/Box';

const LoginBox = styled(Box)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: center;
  left: 50%;
  top: 17%;
  transform: translate(-50%, 17%);
  width: 340px;

  @media (min-width: ${(props) => props.theme.breakpoints.small}) {
    width: 380px;
  }
`;

export default LoginBox;
