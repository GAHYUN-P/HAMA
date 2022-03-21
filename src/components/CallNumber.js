import React from "react";

import styled from "styled-components";

const CallNumber = (props) => {
    const { phone, setPhone } =props;

    return(
        <Grid>
            <InvidPart>전화번호</InvidPart>
            <NickInput value={phone} onChange={(e)=>{setPhone(e.target.value)}} type='text' placeholder='010-0000-0000' />
            <Inform>* 필수는 아니지만 이벤트 참여가 어려울 수 있습니다.</Inform>
        </Grid>
    )
}

const Grid = styled.div`
    padding: 1rem 0 4rem 0;
`;

const InvidPart = styled.div`
  margin-bottom: .4rem;
`;

const NickInput = styled.input`
    display: block;
    width: 100%;
    padding: .7rem .8rem;
    border: 1px solid #dcdcdc;
    border-radius: .3rem;
    outline: none;
    &::placeholder{
        font-size: ${({theme}) => theme.fontSizes.small};
        color: #dcdcdc;
    }
`;

const Inform = styled.div`
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #ff7a7a;
`;

export default CallNumber;