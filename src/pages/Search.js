import React,{ useState, useRef } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { searchActions } from '../redux/modules/search';

import RecentWord from '../components/RecentWord';

import { getToken } from '../shared/cookie';

const Search = (props) => {
    const dispatch = useDispatch();
    const requestResult = useSelector(state => state.search.requestResult);
    const ref = useRef('');

    const insertWord = () => {
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
            <div style={{width:'100%',height:'100%'}} >
                {/* 검색창 */}
                <div style={{width:'90%',border:'1px solid #000',padding:'4px',margin:'15px auto'}} >
                    <input 
                    ref={ref}
                    placeholder='키워드 입력'
                    style={{border:'none',width:'80%'}} />
                    <button onClick={insertWord} >검색</button>
                </div>
                {/* 최근 검색어: 로그인 시 보일 것 */}
                <div style={{width:'90%',margin:'auto'}} >
                    <RecentWord />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Search;