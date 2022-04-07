import React,{ useRef } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { searchActions } from '../redux/modules/search';

import RecentWord from '../components/RecentWord';
import Header from '../components/Header';
import Footer from '../components/Footer';

import {IoSearchOutline} from 'react-icons/io5';

import styled from 'styled-components';

const Search = (props) => {
    const dispatch = useDispatch();
    const requestResult = useSelector(state => state.search.requestResult);
    const ref = useRef('');

    // 단어를 검색할 시 작동하는 함수
    const insertWord = (e) => {
        // 엔터키를 누를 시 검색결과창으로 넘어감
        if(e.key !== 'Enter'){
            return
        }
        if(!ref.current.value){
            window.alert('단어를 입력해주세요.')
            return
        }
        history.push(`/search/${ref.current.value}`)
    }

    React.useEffect(()=>{
        // 들어오면 바로 검색창에 단어를 입력할 수 있도록
        // 인풋에 바로 focus를 걸어줌
        ref.current.focus();
        // 만일 이전 검색 결과가 남아 있다면 이를 초기화 해주는 함수
        if(requestResult){
            dispatch(searchActions.initResult());
            ref.current.focus();
        }
    },[])

    return(
        <React.Fragment>
            <Header />
            <Grid>
                {/* 검색창 */}
                <SearchBar>
                    <Icon>
                        <IoSearchOutline />
                    </Icon>
                    <SearchInput ref={ref} onKeyPress={insertWord}/>
                </SearchBar>

                {/* 최근 검색어: 로그인 시 보일 것 */}        
                <RecentWord />
            </Grid>
            <Footer />
        </React.Fragment>
    )
}

const Grid = styled.div`
    padding: ${({theme})=> theme.paddings.default};
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

export default Search;