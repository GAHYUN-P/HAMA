import React from 'react';

const WriteUser = (props) => {
    const { writer, modifiedAt, profile } = props;

    return(
        <React.Fragment>
            <div>
                
                <div style={{display:'inline-block'}} >
                    프로필
                </div>
                
                <div style={{display:'inline-block'}} >
                    <div>
                        {writer}
                    </div>
                    <div>
                        {modifiedAt}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
};

export default WriteUser;