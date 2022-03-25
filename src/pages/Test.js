import React from 'react';

import { useParams } from 'react-router-dom';

import styled from 'styled-components';

const Test = (props) => {

    const { id } = useParams();
    console.log(id);

  return (
    <React.Fragment>
        {id}        
    </React.Fragment>
  );
};



export default Test;
