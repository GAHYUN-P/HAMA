import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../redux/modules/search";

import { getToken } from "../shared/cookie";

import styled from "styled-components";

const RecentWord = (props) => {
    const dispatch = useDispatch();
    const [view,setView] = useState(true);
    const recentWord = useSelector(state => state.search.recentWord);
    console.log(recentWord);

    React.useEffect(()=>{
        if(getToken()&&!recentWord){
            dispatch(searchActions.setRecentWordDB());
        }
    },[])

    // 비로그인 상태일 때 보일 페이지
    if(!getToken()){
        return(
            <React.Fragment>
                <div style={{width:'100%'}} >
                    로그인하시면 최근 검색어 보실 수있습니다.
                </div>
            </React.Fragment>
        )
    }

    // 로그인 상태일 때 보일 페이지
    return (
        <React.Fragment>
            <div style={{width:'100%'}} >
                {recentWord && view &&
                recentWord.map((r,i)=>{
                    return(
                        <div key={i} >
                            {r}
                        </div>
                    )
                })}
                <div style={{width:'100%',display:'flex',justifyContent:'space-between',padding:'5px 0 0'}} >
                    <button onClick={()=>{setView(!view)}} >
                        {view ? '최근검색어 끄기':'최근검색어 켜기'}
                    </button>
                    {view ? <button>전체삭제</button> : ''}
                </div>
            </div>
        </React.Fragment>
    )
}

const PutterBtn = styled.button`

`;

export default RecentWord;