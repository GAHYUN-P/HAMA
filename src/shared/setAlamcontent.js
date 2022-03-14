export const setAlamContent = (type,title,nickname,is_child)=> {
    let content = '';
    // 답변글 작성됐을 때
    if(type === 'answer'){
        content = `${nickname}님이 [${title}]에 답변글을 남겼습니다.`
    }
    // 댓글이 작성됐을 때
    if(type === 'comment' && !is_child){
        content = `${nickname}님이 [${title}]에 댓글을 남겼습니다.`
    }
    // 대댓글이 작성됐을 때
    if(type === 'comment' && is_child){
        content = `${nickname}님이 [${title}]에 대댓글을 남겼습니다.`
    }
    // 좋아요를 받았을 때
    if(type === 'like'){
        content = `${nickname}님이 [${title}]에 좋아요 하셨습니다.`
    }
    // 평가요청
    if(type === 'rate'){
        content = `${nickname}님 [${title}]에 평가를 해주세요.`
    }
    // 평가받았을 때
    if(type === 'rated'){
        content = `${nickname}님의 [${title}]이 평가를 받았습니다.`
    }
    return content
}