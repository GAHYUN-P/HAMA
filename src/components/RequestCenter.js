import React from 'react';
import axios from 'axios';

const RequestCenter = (props) => {
    const pushlike = () => {
        const token = document.cookie.split('=')[1];
        const config = {
            headers:{
                'token':token
            }
        }
        axios.post(`/api/post/like/${props.request.postId}`,config)
        .then(()=>{
            window.alert('좋아요 성공');
        })
        .catch(err => {
            console.log('error',err);
        })
    }

    return (
        <React.Fragment>
            <div style={{ width:'90%', margin:'10px auto 0' }} >
                <div onClick={pushlike}
                 style={{display:'inline-block'}} >좋아요 {props.like.length}</div>
                <div style={{display:'inline-block'}} >응답 {props.request.answerCount}</div>
            </div>
        </React.Fragment>
    )
}

export default RequestCenter;