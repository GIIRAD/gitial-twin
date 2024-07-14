import styled from 'styled-components';

const Background = styled.div<{color: string}>`
  min-height: 100vh;
  width: 100%;
  background: ${({ color }) => color};
`;

export default Background;
