import React from "react";

const ChildComment = (props) => {



    return(
        <React.Fragment>
            <div style={{ margin:'0 0 0 20px' }} >

                <div style={{display:'flex'}} >
                        <div>프로필</div>
                        <div>{props.commentWriter}</div>
                    </div>
                    <div>{props.content}</div>
                    <div style={{display:'flex'}} >
                        <div>{props.modifiedAt}</div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default ChildComment;