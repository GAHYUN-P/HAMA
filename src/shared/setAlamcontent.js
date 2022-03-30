import styled from "styled-components";
import { history } from "../redux/configureStore";

// 알람카드의 내용을 돌려주는 함수
const setAlamContent = (data)=> {
    // 제목을 가공해야 하기에 const(상수)가 아닌 let(변수)로 선언함
    let { senderNickName, alarmType, title, modifiedAt, point } = data;
    
    // 제목이 10글자보다 크다면 이를 10글자 보다 아래로 줄여주는 조건식
    if(title.length > 10){title = title.slice(0,10) + '...'};

    // 만일 point가 존재한다면 이는 경험치 획득 알람임
    if(point){
        // 답변글을 평가할 경우
        if(alarmType === 'pointR'){
            return(
                <Crid>
                    [{title}] 글을 평가하시고 {point}점을 받으셨습니다.
                    <Time>{modifiedAt}</Time>
                </Crid>
            )
        }
        // 답변글을 평가받은 경우
        if(alarmType === 'pointRD'){
            return(
                <Crid>
                    [{title}] 글이 평가 완료되어 {point}점을 받으셨습니다.
                    <Time>{modifiedAt}</Time>
                </Crid>
            )
        }
        // 마감임박글에 답변을 작성한 경우
        if(alarmType === 'pointA'){
            return(
                <Crid>
                    마감임박!! [{title}] 글에 답변을 쓰셔서 {point}점을 받으셨습니다.
                    <Time>{modifiedAt}</Time>
                </Crid>
            )
        }
        // 답변글이 좋아요를 받은 경우
        if(alarmType === 'pointAL'){
            return(
                <Crid>
                    [{title}] 글이 좋아요를 받아 {point}점을 받으셨습니다.
                    <Time>{modifiedAt}</Time>
                </Crid>
            )
        }
        // 요청글이 좋아요를 받은 경우
        if(alarmType === 'pointPL'){
            return(
                <Crid>
                    [{title}] 글이 좋아요를 받아 {point}점을 받으셨습니다.
                    <Time>{modifiedAt}</Time>
                </Crid>
            )
        }

    };
    // 방명록 작성 알람
    if(alarmType === 'commentMP'){
        return(
            <Crid>
                {senderNickName}님이 방명록에 [{title}]이라는 글을 남겼습니다.
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    }
    // 업적 달성 시
    if(alarmType === 'achieve'){
        return(
            <Crid>
                축하합니다~! [{title}] 업적을 달성하셨습니다!!
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    };
    // 답변작성 완료 시
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

// 알람 카드에 넘겨주기 위한 내용물들의 css
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

// 알람에 따라 이동하는 함수로 해당하는 배열에 알람의 타입이 포함되어 있다면 
// 그쪽으로 작동
const MoveTo = (alarmType,id) => {
    // 요청상세글로 이동
    if(['likeP','answer','pointPL','rate'].includes(alarmType)){
        history.push(`/requestdetail/${id}`);
    }
    // 답변상세글로 이동
    if(['answerC','comment','rated','likeA','pointAL','pointRD','pointR','pointA'].includes(alarmType)){
        history.push(`/answerdetail/${id}`);
    }
    // 대댓글 페이지로 이동
    if(alarmType === 'child'){
        history.push(`/comment/${id}`);
    }
    // 마이페이지로 이동
    if(alarmType === 'level' || alarmType === 'commentMP' ){
        history.push('/mypage');
    }
    // 나의 업적 페이지로 이동
    if(alarmType === 'achieve'){
        history.push('/mypage_achievement');
    }
    return;
}

export { setAlamContent, MoveTo };