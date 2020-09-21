import styled, { css } from 'styled-components';

import { ReactComponent as UserIconSVG } from 'user/user-icon.svg';
import { ReactComponent as CalendarIconSVG } from 'shared/SVG/calendar.svg';

//Icons & styles
const HeaderIconStyles = css`
  cursor: pointer;
  height: 2.125rem;
  margin-left: 1.5rem;
  stroke-width: 1.5px;
`;

const CalendarIcon = styled(CalendarIconSVG)`
  ${HeaderIconStyles}
`;

const UserIcon = styled(UserIconSVG)`
  ${HeaderIconStyles}
`;

export { CalendarIcon, UserIcon };
