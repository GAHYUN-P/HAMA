import React from 'react';
import { mypageActions } from '../redux/modules/mypage';
import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import MypageDetailEach from '../components/MypageDetailEach';

const MypageDetail = (props) => {

    const is_what = useSelector((state)=>state.mypage.is_what);
    console.log(is_what);
    const mypostList = useSelector((state)=>state.mypage.mypost);
    const myanswerList = useSelector((state)=>state.mypage.myanswer);
    const userInfo = useSelector((state)=>state.mypage.userInfo);

    
    if(is_what === 'mypost') {
        return (
            <div>
                <div>내가 요청한 글</div>
                {/* <div>{userInfo.nickname} | {userInfo.hippoName} | {userInfo.postCount} | {userInfo.answerCount}</div> */}
                <hr/>
                {mypostList.map((info, idx) => {
                return (
                <MypageDetailEach
                    key={info.requestId}
                    requestId={info.requestId}
                    title={info.title}
                    nickname={info.nickname}
                    modifiedAt={info.modifiedAt}
                    imgUrl={info.imgUrl}
                    is_mypost='true'
                    />
                );
                })}
            </div>
        );
    }

    if(is_what === 'myanswer') {
        return (
            <div>
                <div>나의 답변 글</div>
                {/* <div>{userInfo.nickname} | {userInfo.hippoName} | {userInfo.postCount} | {userInfo.answerCount}</div> */}
                <hr/>
                {myanswerList.map((info, idx) => {
                return (
                <MypageDetailEach
                    key={info.answerId}
                    answerId={info.answerId}
                    title={info.title}
                    category={info.category}
                    nickname={info.nickname}
                    modifiedAt={info.modifiedAt}
                    imgUrl={info.imgUrl}
                    />
                );
                })}
            </div>
        );
    }

    // 나중에 404처리해줘야함
    return <button onClick={()=>{history.push('/mypage')}}>돌아가기</button>;
};

export default MypageDetail;