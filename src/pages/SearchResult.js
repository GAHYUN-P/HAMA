import React,{ useState } from 'react';

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
    // params로 넘겨받은 검색결과 키워드
    const keyword = props.match.params.keyword;
    // 검색결과창에서 다시 검색하기 위한 인풋창을 다루기위한
    // state 초기값은 이미 검색한 단어인 keyword
    const [word,setWord] = useState(keyword);
   
    // 검색결과 창의 내용을 결정해 줄 state
    // request로 초기화하여 무조건 요청글이 먼저 보이도록 설정 
    const [postType,setPostType] = useState('request');
    // 현재 postType이 요청글인지 답변글인지 판단하는 상수
    const is_request = postType === 'request' ? true : false;

    // 요청글 검색결과 리스트
    // requestResult: 요청글 검색결과 리스트-> 검색하면 바로 요청을 받아오는 리스트
    // answerResult: 답변글 검색결과 리스트-> 답변글 버튼을 눌러야 가져오는 리스트
    // answerCount: 답변글 검색결과 갯수 -> 답변글은 답변글을 보는 탭을 누르기 전까지
    // 데이터를 받아오지않음으로 갯수를 요청글 결과 리스트를 받아올 때 따로 받아옴
    const { requestResult, answerResult, answerCount } = useSelector(state => state.search);

    // 단어를 검색할 때 사용하는 함수
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
    // 요청글 검색결과를 요청하는 함수
    React.useEffect(()=>{
        if(!requestResult){
            dispatch(searchActions.getRequestResultDB(word));
        }
    },[]);
    
    // 답변글 검색결과를 요청하는 함수
    // postType을 감지해 답변글이 리덕스 상에 없다면 
    // 답변글 검색결과를 dispatch
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
                        line={is_request ? '#ff7a7a' : '#ccc'} 
                        onClick={()=>{
                            if(is_request){return}
                            setPostType('request')}} 
                        >요청 {requestResult.length}</TypeBtn>
                        <TypeBtn 
                        line={is_request ? '#ccc' : '#ff7a7a'} 
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