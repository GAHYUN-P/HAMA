import React from "react";

import WriteUser from "./WriteUser";

const AnswerContent = (props) => {
    const fileList = props.fileList;
    console.log(fileList);

    return (
        <React.Fragment>
            <div style={{width:'100%', padding:'10px 0'}} >

                {/* 상단 */}
                <div style={{padding:'5px 0'}} >
                    <div>{props.category}</div>

                    <div style={{width:'100%',display:'flex'}} >
                        <div>{props.title}</div>
                        <button>좋아요{props.answerLikeCount}</button>
                    </div>
                </div>

                {/* 중단 */}
                <div style={{padding:'5px 0'}} >
                    <WriteUser {...props} />
                </div>

                {/* 하단 */}
                <div style={{padding:'5px 0'}} >
                    <div>
                        {props.content}
                    </div>
                    <div>
                        {fileList.map((f,i)=>{
                            return <div key={i} >파일입니다.</div>
                        })}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default AnswerContent;