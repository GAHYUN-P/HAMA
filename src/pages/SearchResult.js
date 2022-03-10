import React,{ useState, useRef } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { searchActions } from '../redux/modules/search';
import { history } from '../redux/configureStore';

import Results from '../components/Results';

import styled from 'styled-components';

const SearchResult = (props) => {
    const dispatch = useDispatch();
    const keyword = props.match.params.keyword;
   
    const [postType,setPostType] = useState('request');
    const is_request = postType === 'request' ? true : false

    // 검색결과 정보들
    const requestResult = useSelector(state => state.search.requestResult);
    const answerResult = useSelector(state => state.search.answerResult);
    const requestCount = useSelector(state => state.search.requestCount);
    const answerCount = useSelector(state => state.search.answerCount   );


    React.useEffect(()=>{
        if(!requestResult){
            dispatch(searchActions.getRequestResultDB(keyword));
        }
    },[]);
    
    React.useEffect(()=>{
        if(!answerResult && requestResult){
            dispatch(searchActions.getAnswerResultDB(keyword));
        }
    },[postType]);

    return(
        <React.Fragment>
            <div style={{width:'100%',height:'100%'}} >
                {/* 검색창 */}
                <div
                onClick={()=>{history.goBack()}} 
                style={{border:'1px solid #000',padding:'4px',margin:'15px auto'}} >
                    <input value={keyword} disabled={true} style={{border:'none',width:'80%'}} />
                    <button>검색</button>
                </div>
                {/* 검색 결과 두 가지 버튼 */}
                <div>
                    <div style={{display:'flex',width:'100%'}} >
                        <TypeBtn
                        line={is_request ? 'coral' : '#ccc'} 
                        onClick={()=>{
                            if(is_request){return}
                            setPostType('request')}} 
                        >요청{is_request ? requestResult.length : requestCount }</TypeBtn>
                        <TypeBtn 
                        line={is_request ? '#ccc' : 'coral'} 
                        onClick={()=>{
                            if(!is_request){return}
                            setPostType('answer')
                        }} >답변{!is_request ? answerResult.length : answerCount }</TypeBtn>
                    </div>
                </div>
                {!requestResult && <div>잠시 기다려주세요.</div>}
                {is_request &&
                <div>
                    <Results list={requestResult} is_request={is_request} />
                </div>
                }
                {!is_request && 
                <div>
                    <Results list={answerResult} is_request={is_request} />
                </div>
                }
            </div>
        </React.Fragment>
    )
};

const TypeBtn = styled.div`
    width: 50%;
    border-bottom: 1px solid ${props => props.line};
    text-align: center;
    padding: 0 0 4px;
    cursor: pointer;
`;

export default SearchResult;