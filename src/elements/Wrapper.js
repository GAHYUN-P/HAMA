import React from 'react';
import styled from 'styled-components';

const Wrapper = (props) => {
  return <Container {...props}>{props.children}</Container>;
};

const Container = styled.div`
  padding: ${({ theme }) => theme.paddings.default};
`;

export default Wrapper;
