import React from 'react';

const WriteUser = (props) => {
    console.log(props);

    return(
        <React.Fragment>
            <div>
                
                <div style={{display:'inline-block'}} >
                    프로필
                </div>
                
                <div style={{display:'inline-block'}} >
                    <div>
                        {props.answerWriter}
                    </div>
                    <div>
                        {props.modifiedAt}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
};

export default WriteUser;