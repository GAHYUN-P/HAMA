import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { postActions } from '../redux/modules/post';
import { postAPI } from '../shared/api';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import tune from '../assets/tune.svg';

import { CategoriesForMain } from '../shared/categoryEncoder'
import Tag from '../elements/Tag';

const Category = (props) => {
    // 여기서 받은 리스트를 postList에 전달해주자
    // onclick에서 밸류를 받아와서 api콜 (밸류) 넣어서 해주고
    // state에 넣어주기
    const [ _tag, setTag ] = useState('전체보기');

    // 태그를 모듈화하기
    // state에 잘 담아가지고 그거 데이터 보내주기
    // 그 데이터를 ?
    // 아니다 여기서 그냥 useState 두번하자
    // 아니면 태그만 모듈화 그리고 sort는 그냥 여기서?
    const dispatch = useDispatch();
    // const [tag, setTag] = React.useState();
    // const [sort, setSort] = React.useState();

    const tag = useSelector((state) => state.post.tag);
    const sort = useSelector((state) => state.post.sort);

    const selectTag = async (e) => {
        setTag(e.target.innerHTML);
        dispatch(postActions.setTag(e.target.value));
        console.log(tag);
        
        if (e.target.value === 'all') {
          dispatch(postActions.setTag(e.target.value));
          // 전체조회를 선택한 경우 전체조회 API 호출
          const totalList = await postAPI.getPostList()
          dispatch(postActions.setList(totalList.data));
          return
        }

        dispatch(postActions.setTag(e.target.value));
        console.log(tag);
        const tagChatList = await postAPI.selectPostCategory(e.target.value);
        dispatch(postActions.setList(tagChatList.data))
    }

    const selectSort = async (e) => {
        dispatch(postActions.setSort(e.target.value));
        console.log(tag);
        
        if (e.target.value === 'latest') {
            console.log(e.target.value);
            if (tag === 'all') {
                console.log(tag, sort + " 나와야할것 tag, latest");
                // 전체조회를 선택한 경우 전체조회 API 호출
                const totalList = await postAPI.getPostList();
                dispatch(postActions.setList(totalList.data));
                return;
              }
      
              dispatch(postActions.setTag(tag));
              console.log(tag, sort + " 나와야할것 tag, latest");
              const tagChatList = await postAPI.selectPostCategory(tag);
              dispatch(postActions.setList(tagChatList.data))
              return;
        }

        if (e.target.value === 'like') {
            console.log(e.target.value);
            if (tag === 'all') {
                console.log(tag, sort);
                const totalList = await postAPI.selectPostSort(tag, e.target.value);
                dispatch(postActions.setList(totalList.data));
                return;
              }
      
              dispatch(postActions.setTag(tag));
              const tagChatList = await postAPI.selectPostSort(tag, e.target.value);
              dispatch(postActions.setList(tagChatList.data))
              return;
        }

        if (e.target.value === 'time') {
            console.log(e.target.value);
            if (tag === 'all') {
                console.log(tag, sort);
                const totalList = await postAPI.selectPostSort(tag, e.target.value);
                dispatch(postActions.setList(totalList.data));
                return;
              }
      
              dispatch(postActions.setTag(tag));
              const tagChatList = await postAPI.selectPostSort(tag, e.target.value);
              dispatch(postActions.setList(tagChatList.data))
              return;
        }

    }

    return (
        <div>
            <TitleWrap>
                <div>카테고리</div>
                <SelectWrap>
                    <Box>
                      <FormControl>
                        <Select
                          value={sort}
                          onChange={(e) => { selectSort(e) }}
                          style = {{height:'2rem'}}
                        >
                            <MenuItem value='latest'>최신순</MenuItem>
                            <MenuItem value='time'>잔여시간순</MenuItem>
                            <MenuItem value='like'>좋아요순</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                </SelectWrap>
                <SelectIcon src={tune}/>
            </TitleWrap>

            <div>
                {CategoriesForMain.map((m,i)=>{
                    return (
                    <Tag 
                    _onClick={(e) => { selectTag(e) }} 
                    value={m.value}
                    tag={_tag}>
                        {m.category}
                    </Tag>
                    )
                })}
            </div>
        </div>
    );
};

const TitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Noto-Sans-KR-M;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding-top: ${({ theme }) => theme.paddings.xxl};
    margin-top: ${({ theme }) => theme.margins.divGap};
    margin-bottom: ${({ theme }) => theme.margins.xxl};
    position: relative;
`;

const SelectWrap = styled.div`
    position: absolute;
    left: 88%;
    bottom: 0px;
    opacity: 0;
    z-index: 1;
`;

const SelectIcon = styled.img`
    height: 1.5rem; 
    width: 1.5rem;
    position: absolute;
    left: 93%;
    bottom: -3px;
`;


export default Category;