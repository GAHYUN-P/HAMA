import React,{ useState, useRef } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { searchActions } from '../redux/modules/search';
import { history } from '../redux/configureStore';

import Results from '../components/Results';

import styled from 'styled-components';

const SearchResult = (props) => {
    const dispatch = useDispatch();
    const keyword = props.match.params.keyword;
    const [word,setWord] = useState(keyword);
   
    const [postType,setPostType] = useState('request');
    const is_request = postType === 'request' ? true : false;

    // 검색결과 정보들
    const requestResult = useSelector(state => state.search.requestResult);
    const answerResult = useSelector(state => state.search.answerResult);
    const answerCount = useSelector(state => state.search.answerCount);

    const insertWord = (e) => {
        if(e.key !== 'Enter'){
            return
        }
        if(!word){
            window.alert('단어를 입력해주세요.')
            return
        }
        history.push(`/search/${word}`)
        dispatch(searchActions.getRequestResultDB(word));
    }

    React.useEffect(()=>{
        if(!requestResult){
            dispatch(searchActions.getRequestResultDB(word));
        }
    },[]);
    
    React.useEffect(()=>{
        if(!answerResult && requestResult){
            dispatch(searchActions.getAnswerResultDB(word));
        }
    },[postType]);

    return(
        <React.Fragment>
            <div style={{width:'100%',height:'100%'}} >
                {/* 검색창 */}
                <div
                style={{width:'90%',border:'1px solid #000', borderRadius:'1rem',padding:'0.5rem',margin:'15px auto'}} >
                    <input 
                    value={word} 
                    onKeyPress={insertWord}
                    onChange={(e)=>{setWord(e.target.value)}}
                    style={{border:'none',width:'80%'}} />
                </div>
                {/* 검색 결과 두 가지 버튼 */}
                <div>
                    <div style={{display:'flex',width:'100%'}} >
                        <TypeBtn
                        line={is_request ? 'coral' : '#ccc'} 
                        onClick={()=>{
                            if(is_request){return}
                            setPostType('request')}} 
                        >요청{requestResult.length}</TypeBtn>
                        <TypeBtn 
                        line={is_request ? '#ccc' : 'coral'} 
                        onClick={()=>{
                            if(!is_request){return}
                            setPostType('answer')
                        }} >답변{answerCount}</TypeBtn>
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