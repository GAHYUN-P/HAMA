import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { utilActions } from '../redux/modules/util';
import { utilAPI } from '../shared/api';

const CategoryMypage = (props) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(utilActions.setCategory('mypost'));
    }, []);
    
    const selectTag = async (e) => {
        if (e.target.value === 'mypost') {
          // 전체조회를 선택한 경우 전체조회 API 호출
          const totalList = await utilAPI.getMypostList();
          console.log(totalList);
          dispatch(utilActions.getMypost(totalList.data));
          dispatch(utilActions.setCategory(e.target.value));
          return
        }
        const tagChatList = await utilAPI.getMyanswerList();
        console.log(tagChatList);
        dispatch(utilActions.getMyanswer(tagChatList.data));
        dispatch(utilActions.setCategory(e.target.value));
    }

    return (
        <div>
            <button onClick={(e) => { selectTag(e) }} value='mypost'>내 요청</button>
            <button onClick={(e) => { selectTag(e) }} value='myanswer'>내 답변</button>
        </div>
    );
};

export default CategoryMypage;