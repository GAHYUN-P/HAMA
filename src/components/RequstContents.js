import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

const RequestContents = (props) => {
    const { category, title, level, content, fileList  } = props;
    console.log('중복체크');

    return(
        <React.Fragment>
            <div>
                <h3>{category}</h3>
                <div style={{ width:'90%', margin:'10px auto 0' }} >

                    <div style={{ display:'flex', justifyContent:'space-between' }} >
                        <p>{title}</p>
                        <p>{level}</p>
                    </div>
                    
                    <hr />

                    <div>
                        <p>{content}</p>
                        <button>수정</button>
                    </div>
                    
                    <div style={{width:'100%',whiteSpace:'nowrap', overflowX:'scroll'}} >
                        {fileList.map((f,i)=>{
                            const type = f.split('.')[5]
                            console.log(type);
                            if(type === 'jpg'){
                                return <div key={i} style={{display:'inline-block', width:'100px'}} >이미지</div>
                            }
                            return <div key={i} style={{display:'inline-block', width:'100px'}} >비디오</div>
                        })}
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default RequestContents;