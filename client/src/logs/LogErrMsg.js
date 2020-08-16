import React from 'react';
import styled from 'styled-components';

import Box from 'shared/Box';
import { ReactComponent as RefreshSVG } from 'shared/SVG/refresh.svg';

const LogErrBox = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 200px;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
`;

const LogErrWrapper = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.6;
  margin: 1.5rem;
  text-align: center;
`;

const RefreshIcon = styled(RefreshSVG)`
  cursor: pointer;
  stroke: ${({ theme }) => theme.colors.darkBrown};
  height: 1rem;
  padding: 0 0 1rem;
`;

const LogErrMsg = () => {
  return (
    <LogErrBox>
      <LogErrWrapper>
        Something went wrong
        <br />
        &hellip;working on it.
      </LogErrWrapper>
      <RefreshIcon onClick={() => window.location.reload()} />
    </LogErrBox>
  );
};

export default LogErrMsg;
