import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../redux/modules/search";
import { history } from "../redux/configureStore";

import { getToken } from "../shared/cookie";

import styled from "styled-components";

const RecentWord = (props) => {
    const dispatch = useDispatch();
    const [view,setView] = useState(true);
    const recentWord = useSelector(state => state.search.recentWord);

    console.log(recentWord);

    const deleteAll = () => {
        if(window.confirm('정말로 전부 삭제하시겠습니까?')){
            dispatch(searchActions.deleteAllRecentWordDB());
        }
    }

    React.useEffect(()=>{
        if(getToken()){
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
                {recentWord.length > 0 && view &&
                <div>최근 검색어</div>
                }
                {recentWord.length === 0 && 
                <div style={{textAlign:'center',padding:'2rem'}} >이전 검색어가 없습니다.</div>
                }
                {recentWord && view &&
                recentWord.map((r,i)=>{
                    return(
                        <div key={i} 
                        style={{
                            display:'flex',
                            borderBottom:'1px solid #ccc',padding:'0.8rem 0'
                            }} >
                            <div 
                            onClick={()=>{history.push(`/search/${r.searchWord}`)}} 
                            style={{width:'100%',display:'flex',justifyContent:'space-between'}} >
                                <div>{r.searchWord}</div>
                                <div>{r.modifiedAt}</div>
                            </div>    
                            <div
                            style={{padding:'0 0.6rem',cursor:'pointer'}} 
                            onClick={()=>
                                {dispatch(searchActions.deleteOneRecentWordDB(r.id))}
                                } >X</div>
                        </div>
                    )
                })}
                {recentWord.length > 0 &&
                <div style={{
                    width:'100%',display:'flex',justifyContent:'space-between',padding:'0.8rem 0',
                    borderBottom:'1px solid #ccc'
                    }} >
                    <PutterBtn onClick={()=>{setView(!view)}} >
                        {view ? '최근검색어 끄기':'최근검색어 켜기'}
                    </PutterBtn>
                    {view ? <PutterBtn onClick={deleteAll} >전체삭제</PutterBtn> : ''}
                </div>}
            </div>
        </React.Fragment>
    )
}

const PutterBtn = styled.div`
    border: none;
    font-size: 0.8rem;
    background: #fff;
`;

export default RecentWord;