import styled from "styled-components";

export const setAlamContent = (data)=> {
    let { alarmId ,id, senderNickName, alarmType, title, modifiedAt, readingStatus } = data;
    let content = '';
    if(title.length > 10){
        title = title.slice(0,10) + '...';
    }
    // 답변글 작성됐을 때
    if(alarmType === 'answer'){
        content = `${senderNickName}님이 [${title}] 글에 답변글을 남겼습니다.`
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
        content = `${senderNickName}님이 [${title}] 글에 댓글을 남겼습니다.`
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
        content = `${senderNickName}님이 [${title}] 댓글에 대댓글을 남겼습니다.`
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
                <Nick>{senderNickName}</Nick>
                님이 [{title}] 글에 댓글을 남겼습니다.
                <Time>{modifiedAt}</Time>
            </Crid>
        )
    }
    // 평가받았을 때
    if(alarmType === 'rated'){
        return(
            <Crid>
                <Nick>{senderNickName}</Nick>
                님이 [{title}] 글에 댓글을 남겼습니다.
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
        return
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