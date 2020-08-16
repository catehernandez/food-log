import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const StatusCode = styled.div`
  font-size: 200px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const ErrMsg = styled.div`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <StatusCode>404</StatusCode>
      <ErrMsg>Page not found</ErrMsg>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
