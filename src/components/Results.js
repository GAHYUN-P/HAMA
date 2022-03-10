import React from "react";

import { history } from "../redux/configureStore";

import styled from "styled-components";

const Results = (props) => {
    const list = props.list;
    const is_request = props.is_request;

    return(
        <React.Fragment>
            {!list &&
            <div>잠시만용</div>}
            {list &&
            list.map((l,i)=>{
                return (
                    <div key={i} style={{display:'flex'}} >
                        <div>
                            {l.category}
                        </div>
                        <div onClick={()=>{
                            if(is_request){
                                history.push(`/requestdetail/${l.id}`)
                            }
                            if(!is_request){
                                history.push(`/answerdetail/${l.id}`)
                            }
                        }} >
                            <div>
                                {l.title}
                            </div>
                            <div>
                                {l.content}
                            </div>
                        </div>
                        <div>
                            {l.file? <Elimg src={l.file} /> : ''}
                        </div>
                        <div>
                            {l.modifiedAt}
                        </div>
                    </div>
                )
            })}
        </React.Fragment>
    )
}

const Elimg = styled.img`
    width: 5rem;
    height: 5rem;
`

export default Results;