import styled from "styled-components";

export const setAlamContent = (type,title,nickname,time)=> {
    let content = '';
    if(title.length > 10){
        title = title.slice(0,10) + '...';
    }
    // 답변글 작성됐을 때
    if(type === 'answer'){
        content = `${nickname}님이 [${title}] 글에 답변글을 남겼습니다.`
        return(
            <Crid>
                <Nick>{nickname}</Nick>
                님이 [{title}] 글에 답변글을 남겼습니다.
                <Time>{time}</Time>
            </Crid>
        )
    }
    // 댓글이 작성됐을 때
    if(type === 'comment'){
        content = `${nickname}님이 [${title}] 글에 댓글을 남겼습니다.`
        return(
            <Crid>
                <Nick>{nickname}</Nick>
                님이 [{title}] 글에 댓글을 남겼습니다.
                <Time>{time}</Time>
            </Crid>
        )
    }
    // 대댓글이 작성됐을 때
    if(type === 'child'){
        content = `${nickname}님이 [${title}] 댓글에 대댓글을 남겼습니다.`
        return(
            <Crid>
                <Nick>{nickname}</Nick>
                님이 [{title}] 댓글에 대댓글을 남겼습니다.
                <Time>{time}</Time>
            </Crid>
        )
    }
    // 좋아요를 받았을 때
    if(type === 'likeA' || 'likeB'){
        content = `${nickname}님이 [${title}] 글에 좋아요 하셨습니다.`
        return(
            <Crid>
                <Nick>{nickname}</Nick>
                님이 [{title}] 글에 좋아요 하셨습니다.
                <Time>{time}</Time>
            </Crid>
        )
    }
    // 평가요청
    if(type === 'rate'){
        content = `${nickname}님 [${title}] 글에 평가를 해주세요.`
        return(
            <Crid>
                <Nick>{nickname}</Nick>
                님이 [{title}] 글에 댓글을 남겼습니다.
                <Time>{time}</Time>
            </Crid>
        )
    }
    // 평가받았을 때
    if(type === 'rated'){
        content = `${nickname}님의 [${title}] 글이 평가를 받았습니다.`
        return(
            <Crid>
                <Nick>{nickname}</Nick>
                님이 [{title}] 글에 댓글을 남겼습니다.
                <Time>{time}</Time>
            </Crid>
        )
    }
    // 레벨이 올랐을 때
    if(type === 'level'){
        content = `축하드립니다. 레벨이 올랐습니다!!`
    }
    return content
}

const Crid = styled.div`
    position: relative;
    line-height: 1.3rem;
    display: inline-block;
`;

const Nick = styled.div`
    display: inline-block;
    font-weight: 600;
`;

const Time = styled.div`
    font-size: ${({theme})=> theme.fontSizes.small};
    color: #9e9e9e;
    position: absolute;
    bottom: 0;
    right: .8rem;
`;