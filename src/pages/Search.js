import React from 'react';
import { mypageActions } from '../redux/modules/mypage';
import { useSelector,useDispatch } from 'react-redux';
import Medal from '../components/Medal';
import MypostList from '../components/MypostList';
import MyanswerList from '../components/MyanswerList';
import { history } from '../redux/configureStore';

const Search = (props) => {

    

  return (
    <div>
        <input onChange={()=>{}}/>
    </div>
  );
};

export default Search;
