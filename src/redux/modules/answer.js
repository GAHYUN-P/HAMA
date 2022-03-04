import { createReducer, createAction } from '@reduxjs/toolkit';
import { getUserId } from '../../shared/cookie';

import { answerAPI } from '../../shared/api';

export const initialState = {
    answer: {
        answerId: 1,
        requestWriterId: 1,
        answerWriterId: 2,
        title:'라면 무따 아이가',
        content:'시원하고 얼큰하네예',
        modifiedAt: '2020-10-10T11:27:39',
        star: 0,
        category:'먹방/음식',
        commentCount: 0,
        likeUserId: [],
        answerLikeCount: 0,
        answerWriter:'라면무쨔',
        fileList:[]
    },
    comments: [{

        answerId : 2,
        commentId : 2,
        commentWriterId : 2,
        commentWriter : '라면 무따',
        content : '개마싯게네요',
        modifiedAt : '2020-10-10T11:27:39',

        childComment:[
            {
                answerId : 2,
                commentId : 2,
                commentWriterId : 2,
                commentWriter : '멍멍 먹쟈',
                content : '얼큰하게써요 ㅎㅎ',
                modifiedAt : '2020-10-10T11:27:39'
            }
        ]

    },]
}

//actions 
const setAnswer = createAction('answer/setAnswer');

// reducer
const answer = createReducer(initialState,{
    [setAnswer]: (state,action) => {
        state.answer = action.payload.answer
        state.comments = action
    }
})

// middlewares


export const answerActions = {

}

export default answer;