import React from "react";
import styled from "styled-components";

const RequestContents = (props) => {
    


    return(
        <React.Fragment>
            <div>
                <h3>카테고리</h3>
                <div style={{ width:'90%', margin:'10px auto 0' }} >

                    <div style={{ display:'flex', justifyContent:'space-between' }} >
                        <p>제목</p>
                        <p>난이도</p>
                    </div>
                    
                    <hr />

                    <div>
                        <p>내용</p>
                        <button>수정</button>
                    </div>
                    
                    <div style={{whiteSpace:'nowrap', overflowX:'scroll'}} >
                        이미지 / 동영상
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default RequestContents;