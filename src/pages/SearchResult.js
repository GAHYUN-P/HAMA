import React,{ useState, useRef } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { searchActions } from '../redux/modules/search';
import { history } from '../redux/configureStore';

import Results from '../components/Results';
import Header from '../components/Header';
import Footer from '../components/Footer';

import {IoSearchOutline} from 'react-icons/io5';

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
        setPostType('request');
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
            <Header />
            <Grid>
                {/* 검색창 */}
                <SearchBar>
                    <Icon>
                        <IoSearchOutline />
                    </Icon>
                    <SearchInput 
                    value={word} 
                    onKeyPress={insertWord}
                    onChange={(e)=>{setWord(e.target.value)}}/>
                </SearchBar>
            </Grid>

                {/* 검색 결과 두 가지 버튼 */}
                <div>
                    <div style={{display:'flex',width:'100%'}} >
                        <TypeBtn
                        line={is_request ? 'coral' : '#ccc'} 
                        onClick={()=>{
                            if(is_request){return}
                            setPostType('request')}} 
                        >요청 {requestResult.length}</TypeBtn>
                        <TypeBtn 
                        line={is_request ? '#ccc' : 'coral'} 
                        onClick={()=>{
                            if(!is_request){return}
                            setPostType('answer')
                        }} >답변 {answerCount}</TypeBtn>
                    </div>
                </div>
                {/* 답변 분기 */}
                {is_request &&
                <Results list={requestResult} is_request={is_request} keyword={keyword} />}
                {!is_request && 
                <Results list={answerResult} is_request={is_request} keyword={keyword} />}
            <Footer />
        </React.Fragment>
    )
};

const Grid = styled.div`
    padding: ${({theme})=> theme.paddings.default};
`;

const TypeBtn = styled.div`
    width: 50%;
    border-bottom: 1px solid ${props => props.line};
    color: ${props => props.line};
    text-align: center;
    padding: 0 0 4px;
    cursor: pointer;
`;

const SearchBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({theme})=> theme.paddings.small};
    border-radius: 1rem;
    background-color: #f5f5f5;
`;

const SearchInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
`;

const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({theme})=> theme.fontSizes.lg};
    color: #9e9e9e;
`;

export default SearchResult;