import React from 'react';
import styled from 'styled-components';

import UnstyledLink from '../shared/UnstyledLink';

const H1 = styled.h1`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const SiteTitle = () => {
  return (
    <H1>
      <UnstyledLink to="/">Intueat</UnstyledLink>
    </H1>
  );
};

export default SiteTitle;
