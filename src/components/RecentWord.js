import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../redux/modules/search";
import { history } from "../redux/configureStore";

import { getToken } from "../shared/cookie";

import styled from "styled-components";

const RecentWord = (props) => {
    const dispatch = useDispatch();
    // 최근 검색어 기능을 보여줄지 말지 결정하는 state
    const [view,setView] = useState(true);
    // 최근 검색어 배열
    const recentWord = useSelector(state => state.search.recentWord);

    // 모든 최근 검색어를 삭제 요청하는 함수
    const deleteAll = () => {
        if(window.confirm('정말로 전부 삭제하시겠습니까?')){
            dispatch(searchActions.deleteAllRecentWordDB());
        }
    };

    // 로그인 상태일 때에만 해당유저의 최근 검색어를 요청함
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
            <div>
                {recentWord.length > 0 && view &&
                <Latest>
                    최근 검색어
                </Latest>
                }
                {recentWord.length === 0 && 
                <div style={{textAlign:'center',padding:'2rem'}} >
                    이전 검색어가 없습니다.
                </div>
                }
                {recentWord && view &&
                recentWord.map((r,i)=>{
                    return(
                        <CardGrid key={i}>
                            <DataGrid onClick={()=>{history.push(`/search/${r.searchWord}`)}}>
                                <WordPart>
                                    {r.searchWord}
                                </WordPart>
                                <TimePart>
                                    {r.modifiedAt}
                                </TimePart>
                            </DataGrid>    
                            <DelBtn onClick={()=>{dispatch(searchActions.deleteOneRecentWordDB(r.id))}} >
                                <ExL/><ExR/>
                            </DelBtn>
                        </CardGrid>
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

const CardGrid = styled.div`
    display: flex;
    padding: ${({theme})=> theme.paddings.base} 0;
    border-bottom: .08rem solid #efefef;
`;

const Latest = styled.div`
    font-size: ${({theme})=> theme.fontSizes.lg};
    padding: ${({theme})=> theme.paddings.default} 0 ${({theme})=> theme.paddings.xl};
`;

const DataGrid = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const WordPart = styled.div`
    font-size: ${({theme})=> theme.fontSizes.base};
    color: #212121;
`;

const TimePart = styled.div`
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #9e9e9e;
`;

const DelBtn = styled.div`
    position: relative;
    margin: .08rem 0 0 1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 2rem;
    background-color: #c4c4c4;
`;

const ExR = styled.div`
    position: absolute;
    width: .8rem;
    border-bottom: solid .1225rem #fff;
    transform: rotate(45deg);
    bottom: .4rem;
    right: .01rem;
`;

const ExL = styled.div`
    position: absolute;
    width: .8rem;
    border-bottom: solid .1225rem #fff;
    transform: rotate(135deg);
    bottom: .4rem;
    right: .01rem;
`;

const PutterBtn = styled.div`
    border: none;
    font-size: 0.8rem;
    background: #fff;
`;

export default RecentWord;