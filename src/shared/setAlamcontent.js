import styled from "styled-components";
import { getUserId } from "./cookie";
import { history } from "../redux/configureStore";

const setAlamContent = (data)=> {
    let { senderNickName, alarmType, title, modifiedAt, point, receiverId } = data;
    const id = getUserId();
    
    if(title.length > 10){title = title.slice(0,10) + '...'};

    if(point){
        if(alarmType === 'pointR' && receiverId === id){
            return(
                <Crid>
                    [{title}] 글을 평가하시고 {point}점을 받으셨습니다.
                    <Time>{modifiedAt}</Time>
                </Crid>
            )
        }
        if(alarmType === 'pointR' && receiverId !== id){
            return(
                <Crid>
                    [{title}] 글을 평가받으셔서 {point}점을 받으셨습니다.
                    <Time>{modifiedAt}</Time>
                </Crid>
            )
        }
        if(alarmType === 'pointA'){
            return(
                <Crid>
                    마감임박!! [{title}] 글에 답변을 쓰셔서 {point}점을 받으셨습니다.
                    <Time>{modifiedAt}</Time>
                </Crid>
            )
        }
        if(alarmType === 'pointAL'){
            return(
                <Crid>
                    [{title}] 글이 좋아요를 받아 {point}점을 받으셨습니다.
                    <Time>{modifiedAt}</Time>
                </Crid>
            )
        }
        if(alarmType === 'pointPL'){
            return(
                <Crid>
                    [{title}] 글이 좋아요를 받아 {point}점을 받으셨습니다.
                    <Time>{modifiedAt}</Time>
                </Crid>
            )
        }

    }
    
    if(alarmType === 'answerC'){
        return(
            <Crid>
                [{title}] 글이 작성이 완료됐습니다.
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    }
    // 답변글 작성됐을 때
    if(alarmType === 'answer'){
        return(
            <Crid>
                <Nick>{senderNickName}</Nick>
                님이 [{title}] 글에 답변글을 남겼습니다.
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    }
    // 댓글이 작성됐을 때
    if(alarmType === 'comment'){
        return(
            <Crid>
                <Nick>{senderNickName}</Nick>
                님이 [{title}] 글에 댓글을 남겼습니다.
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    }
    // 대댓글이 작성됐을 때
    if(alarmType === 'child'){
        return(
            <Crid>
                <Nick>{senderNickName}</Nick>
                님이 [{title}] 댓글에 대댓글을 남겼습니다.
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    }
    // 좋아요를 받았을 때
    if(alarmType === 'likeA' ||alarmType === 'likeP'){
        return(
            <Crid>
                <Nick>{senderNickName}</Nick>
                님이 [{title}] 글에 좋아요 하셨습니다.
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    }
    // 평가요청
    if(alarmType === 'rate'){
        return(
            <Crid>
                [{title}] 글이 마감되었으니 평가해주세요.
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    }
    // 평가받았을 때
    if(alarmType === 'rated'){
        return(
            <Crid>
                [{title}] 글이 평가를 받았습니다.
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    }
    if(alarmType === 'point'){
        return(
            <Crid>
                {title}의 경험치를 획득하셨습니다!!
                <Time>{modifiedAt}</Time>   
            </Crid>
        )
    }
    // 레벨이 올랐을 때
    if(alarmType === 'level'){
        return (
            <Crid>
                축하합니다!! 레벨업 하셨습니다.
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    }
    return null;
}

const Crid = styled.div`
    position: relative;
    line-height: 1.3rem;
`;

const Nick = styled.div`
    display: inline-block;
    font-weight: 600;
`;

const Time = styled.span`
    font-size: ${({theme})=> theme.fontSizes.small};
    padding-left: .5rem;
    color: #9e9e9e;
`;

// 알람에 따라 이동하는 함수
const MoveTo = (alarmType,id) => {
    if(['likeP','answer','pointPL','rate'].includes(alarmType)){
        history.push(`/requestdetail/${id}`);
    }
    if(['answerC','comment','rated','likeA','pointAL','pointR','pointA'].includes(alarmType)){
        history.push(`/answerdetail/${id}`);
    }
    if(alarmType === 'child'){
        history.push(`/comment/${id}`);
    }
    if(alarmType === 'level'){
        history.push('/mypage');
    }
    return
}

export { setAlamContent, MoveTo }