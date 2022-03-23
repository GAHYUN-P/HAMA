import React from 'react';
import styled from 'styled-components';
import { mypageActions } from '../redux/modules/mypage';
import { useSelector,useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import MypageDetailEach from '../components/MypageDetailEach';
import Header from '../components/Header';
import ProfileImg from '../elements/ProfileImg';

const MypageDetail = (props) => {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(mypageActions.getUserInfo());
    }, []);

    const is_what = useSelector((state)=>state.mypage.is_what);
    console.log(is_what);
    const mypostList = useSelector((state)=>state.mypage.mypost);
    const myanswerList = useSelector((state)=>state.mypage.myanswer);
    const userInfo = useSelector((state)=>state.mypage.userinfo);

    console.log(userInfo);

    
    if(is_what === 'mypost') {
        return (
            <>
            <Header is_what={is_what} />
            <Wrap>
                <UserinfoWrap>
                    <ProfileImg shape='circle' src={userInfo.hippoImage} size='5rem'/>
                    <WrapName>
                        <WrapNickname><Nickname>{userInfo.nickname}</Nickname> 님</WrapNickname>
                        <HippoName>{userInfo.hippoName}</HippoName>
                    </WrapName>
                    <div>
                        <div style={{textAlign: 'center'}}>{userInfo.postCount}</div>
                        <HippoName>요청한 글</HippoName>
                    </div>
                    <div>
                        <div style={{textAlign: 'center'}}>{userInfo.answerCount}</div>
                        <HippoName>답변한 글</HippoName>
                    </div>
                </UserinfoWrap>
                <Division/>
                {mypostList.map((info, idx) => {
                return (
                <MypageDetailEach
                    key={info.requestId}
                    id={info.requestId}
                    title={info.title}
                    nickname={info.nickname}
                    modifiedAt={info.modifiedAt}
                    img={info.img}
                    category={info.category}
                    is_mypost='true'
                    />
                );
                })}
            </Wrap>
            </>
        );
    }

    if(is_what === 'myanswer') {
        return (
            <>
            <Header is_what={is_what} />
            <Wrap>
                <UserinfoWrap>
                    <ProfileImg shape='circle' src={userInfo.hippoImage} size='5rem'/>
                    <WrapName>
                        <WrapNickname><Nickname>{userInfo.nickname}</Nickname> 님</WrapNickname>
                        <HippoName>{userInfo.hippoName}</HippoName>
                    </WrapName>
                    <div>
                        <div style={{textAlign: 'center'}}>{userInfo.postCount}</div>
                        <HippoName>요청한 글</HippoName>
                    </div>
                    <div>
                        <div style={{textAlign: 'center'}}>{userInfo.answerCount}</div>
                        <HippoName>답변한 글</HippoName>
                    </div>
                </UserinfoWrap>
                <Division/>
                {myanswerList.map((info, idx) => {
                return (
                <MypageDetailEach
                    key={info.answerId}
                    id={info.answerId}
                    title={info.title}
                    category={info.category}
                    nickname={info.nickname}
                    modifiedAt={info.modifiedAt}
                    img={info.img}
                    is_myanswer='true'
                    />
                );
                })}
            </Wrap>
            </>
        );
    }

    // 나중에 404처리해줘야함
    return <>{history.push('/mypage')}</>;
};

const Wrap = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: scroll;
`;

const UserinfoWrap = styled.div`
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px ${({ theme }) => theme.paddings.default};
`;

const WrapName = styled.div`
    width: 30%;
`;

const WrapNickname = styled.div`
    display: flex;
    align-items: baseline;
`;

const Nickname = styled.div`
    font-family: 'Noto-Sans-KR-M';
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin: 0px 2px 2px 0px;
    padding: 0px 0px 2px 0px;
`;

const HippoName = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: #9E9E9E;
`;

const Division = styled.hr`
    border: 0.5rem solid #E6E6E6;
    background-color: #E6E6E6;
`;

export default MypageDetail;