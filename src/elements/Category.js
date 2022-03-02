import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { postActions } from '../redux/modules/post';
import { postAPI } from '../shared/api';

const Category = (props) => {
    // 여기서 받은 리스트를 postList에 전달해주자
    // onclick에서 밸류를 받아와서 api콜 (밸류) 넣어서 해주고
    // state에 넣어주기

    const dispatch = useDispatch();
    const [tag, setTag] = React.useState();

    React.useEffect(() => {
        setTag('all');
    }, []);
    
    const selectTag = async (e) => {
        setTag(e.target.value)
        console.log(tag);
        if (e.target.value === 'all') {
          // 전체조회를 선택한 경우 전체조회 API 호출
          const totalList = await postAPI.getPostList();
          console.log(totalList);
          dispatch(postActions.setList(totalList.data));
          return
        }
        const tagChatList = await postAPI.selectPostCategory(e.target.value);
        console.log(tagChatList+'성공')
        dispatch(postActions.setList(tagChatList.data))
    }

    return (
        <div>
            <button onClick={(e) => { selectTag(e) }} value='all'>전체</button>
            <button onClick={(e) => { selectTag(e) }} value='cook'>요리</button>
            <button onClick={(e) => { selectTag(e) }} value='health'>운동</button>
            <button onClick={(e) => { selectTag(e) }} value='knowledge'>지식</button>
            <button onClick={(e) => { selectTag(e) }} value='create'>창작</button>
            <button onClick={(e) => { selectTag(e) }} value='visit'>방문</button>
            <button onClick={(e) => { selectTag(e) }} value='job'>직업</button>
            <button onClick={(e) => { selectTag(e) }} value='pet'>반려동물</button>
            <button onClick={(e) => { selectTag(e) }} value='fashion'>패션뷰티</button>
            <button onClick={(e) => { selectTag(e) }} value='consult'>고민상담</button>
            <button onClick={(e) => { selectTag(e) }} value='device'>가전</button>
            <button onClick={(e) => { selectTag(e) }} value='life'>생활</button>
            <button onClick={(e) => { selectTag(e) }} value='etc'>기타</button>
        </div>
    );
};

export default Category;