import React, { useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { answerActions } from '../redux/modules/answer';

import ImageUploader from '../components/ImageUploader';
import VideoUploader from '../components/VideoUploader';
import Header from '../components/Header';

const Answer = (props) => {
    const dispatch = useDispatch(); 
    const postId = props.match.params.postId
    const titleRef = React.useRef();
    const contentRef = React.useRef();

    const answering = () => {
      const title = titleRef.current.value;
      const content = contentRef.current.value;
      const data = {
        title:title,
        content:content
      }
      dispatch(answerActions.answeringDB(data,postId))
    }

    return (
        <React.Fragment>
          <Header />
            <div style={{width:'80%', margin: '16px auto', padding:'16px',}}>

              <div style={{margin:'5px 0'}} >
                <h3>제목</h3>
                <input placeholder='제목을 입력해주세요.' ref={titleRef}
                style={{width:'100%',border:'none',outline:'none',borderBottom:'1px solid black', padding:'4px'}} />
              </div>

              <div style={{margin:'15px 0'}} >
                <h3>내용</h3>
                <textarea placeholder='내용을 작성해 주세요.' rows={5} ref={contentRef}
                style={{ width:'100%',border:'none',outline:'none',
                backgroundColor:'#eee',padding:'24px 8px',borderRadius:'8px' }} />
              </div>

              <div style={{margin:'10px 0'}} >
                <h3>이미지</h3>
                <ImageUploader />
                <VideoUploader />
              </div>
              <div style={{display:'flex', justifyContent:'center', margin:'50px 0 0'}} >
                <button onClick={answering} style={{width:'80px', height:'30px',border:'none',}} >작성</button>
              </div>
            </div>
        </React.Fragment>
    )
}

export default Answer;