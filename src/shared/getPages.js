const Basic =[
    '','request','requestedit','answer','answeredit','requestdetail','answerdetail',
    'comment','search','searchresult','shorts','alam','mypage','mypage_detail'
];
const BasicName = [
    '','요청 작성','요청 수정','답변 작성','답변수정','게시판','게시판',
    '답글','검색하기','검색결과','숏츠','알림','마이페이지','내가 작성한 글'
];

export const getPage = (pathname) => {
    let name = pathname.split('/')[1];
    if(name === 'request' && pathname.split('/').length > 2){
        name = 'requestedit';
    }
    if(name === 'search' && pathname.split('/').length > 2){
        name = 'searchresult';
    }

    const data ={
        type: 'basic',
        title: BasicName[Basic.indexOf(name)] ? BasicName[Basic.indexOf(name)] : '' ,
    }
    return data
};

export const getFooter = (pathname) => {
    const List = ['','search','mypage'];
    let name = pathname.split('/')[1];

    return !List.includes(name)
};

export const getFixed = (pathname) => {
    let name = pathname.split('/')[1];
 
    return name
}

export const NeedAlam = (pathname) => {
    const list = ['mypage','mypage_detail','alam','search'];
    let name = pathname.split('/')[1];
    
    return !list.includes(name);
};