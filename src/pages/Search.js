import React,{ useState, useRef } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { searchActions } from '../redux/modules/search';

import RecentWord from '../components/RecentWord';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Search = (props) => {
    const dispatch = useDispatch();
    const requestResult = useSelector(state => state.search.requestResult);
    const ref = useRef('');

    const insertWord = (e) => {
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
        ref.current.focus();
        if(requestResult){
            dispatch(searchActions.initResult());
            ref.current.focus();
        }
    },[])

    return(
        <React.Fragment>
            <Header />
            <div style={{width:'100%',height:'100%'}} >
                {/* 검색창 */}
                <div style={{width:'90%',border:'1px solid #000', borderRadius:'1rem',padding:'0.5rem 0.5rem',margin:'15px auto',display:'flex'}} >
                    <input 
                    ref={ref}
                    onKeyPress={insertWord}
                    placeholder='키워드 입력'
                    style={{border:'none',width:'100%'}} />
                </div>
                {/* 최근 검색어: 로그인 시 보일 것 */}
                <div style={{width:'90%',margin:'auto'}} >
                    <RecentWord />
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Search;