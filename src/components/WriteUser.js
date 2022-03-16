import React from 'react';

import styled from 'styled-components';

const WriteUser = (props) => {
    const { writer, modifiedAt, profile } = props;

    return(
        <React.Fragment>
            <Grid>
                <div>
                    <ProHippo />
                </div>

                <div>
                    <Writer>
                        {writer}
                    </Writer>
                    <Time>
                        {modifiedAt}
                    </Time>
                </div>

            </Grid>
        </React.Fragment>
    )
};

const Grid = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ProHippo = styled.div`
    width: 1.6rem;
    height: 1.6rem;
    margin: .2rem .3rem 0 0;
    border-radius: 1.6rem;
    background-color: #dcdcdc;
`;

const Writer = styled.div`
    font-size: ${({theme})=>theme.fontSizes.small};
    color: #212121;
`;

const Time = styled.div`
    font-size: ${({theme})=>theme.fontSizes.xsmall};
    line-height: ${({theme})=>theme.fontSizes.xsmall};
    color: #9e9e9e;
`;

export default WriteUser;