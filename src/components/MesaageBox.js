import React, { useState } from 'react';

import styled from 'styled-components';

const MessageBox = (props) => {
    const [confirm,setConfirm] = useState('question');
    const { children, width, height,  } = props;

    // 물어보는 상장 스테이트가 바뀌면 사라질거임
    if(confirm === 'question'){
        return(
            <Container>
                <Wrap>
                    <Box>
                        <div>
                            <div>내용</div>
                            <div>
                                <div onClick={setConfirm(true)} >확인</div>
                                <div onClick={setConfirm} >취소</div>
                            </div>
                        </div>
                    </Box>
                </Wrap>
            </Container>
        )
    }
    return confirm;
}

const Container = styled.div`
    position: fixed;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
`;

const Wrap = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: transparent;
`;

const Box = styled.div`
    position: absolute;
    top: ${props=>props.top};
    left: ${props=>props.left};
    width: ${props=>props.width};
    height: ${props=>props.height};
`;

export {MessageBox}