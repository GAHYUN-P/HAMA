// 타임스탬프 값 가져오기
export const getTimeStamp = (comment) => {
    // 우선 :을 기준으로 분리
    let sep = comment.split(':');
    // 만일 sep의 길이가 1이라면 타임스탬프가 없는 것이다.
    if(sep.length === 1){
        return null;
    }
    console.log('1단계 통과')
    // 문자열을 합친 stamp
    let stamp = sep[0] + sep[1].slice(0,2);
    // 1.두 문자열이 숫자로만 이루어져있다면 0을 곱했을 때 무조건 0이 나와야한다.
    // 2.두 문자열의 합의 길이가 5 이상이면 안된다.
    // 3.첫 번째 문자열의 길이는 1~2여야 한다.
    // 4.두 번째 문자열의 길이는 무조건 2여야 한다.
    // 5.각 문자열은 59를 넘어서는 안된다.
    if(stamp * 0 !== 0 || 
        stamp.length > 4 || 
        !sep[0].length === (1||2) || 
        sep[1].slice(0,2).length !== 2 ||
        59 < (Number(sep[0])||Number(sep[1].slice(0,2)))){
        return null;
    }
    stamp = Number(sep[0]) * 60 + Number(sep[1].slice(0,2));
    return stamp;
};

export const getComment = (comment) => {
    comment = comment.split(':')[1].substring(2);
    return comment;
}

export const getBtnString = (comment) => {
    comment = comment.split(':')[0] + ':' + comment.split(':')[1].slice(0,2);
    return comment;
}

export const getSearchContent = (content,keyword) => {
    if(!content.includes(keyword)){
        return null
    }
    if(!content.split(keyword)[0]){
        content =  content.split(keyword)[1].substring(0,6);
        return '/' + content;
    }
    if(content.split(keyword)[0]){
        content = 
        content.split(keyword)[0].slice(-5,-1)
        + '/' + 
        content.split(keyword)[1].substring(0,4);
        return content
    }
}