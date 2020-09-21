import styled from 'styled-components';

const UserProfilePanel = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightBeige};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  position: absolute;
  transform: translateY(0%);
  transition: transform 300ms;
  width: 100%;

  ${(props) =>
    props.isHidden &&
    `
    transform: translateY(-100%);
  `}

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    right: 0;
    transform: translateX(0%);
    width: 320px;

    ${(props) =>
      props.isHidden &&
      `
      transform: translateX(100%);
    `}
  }
`;

export default UserProfilePanel;
