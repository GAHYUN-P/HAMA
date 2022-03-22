import { history } from "../redux/configureStore";
import { getToken } from "./cookie";

const Basic =[
    '','request','requestedit','answer','answeredit','requestdetail','answerdetail',
    'comment','search','searchresult','shorts','alam','mypage','mypage_detail','hm_posts'
];
const BasicName = [
    '','요청 작성','요청 수정','답변 작성','답변 수정','게시판','게시판',
    '답글','검색하기','검색결과','숏츠','알림','마이페이지','내가 작성한 글','HM이 부탁HAMA'
];

export const getPage = (pathname) => {
    let name = pathname.split('/')[1];
    if(name === 'request' && pathname.split('/').length > 2){
        name = 'requestedit';
    }
    if(name === 'search' && pathname.split('/').length > 2){
        name = 'searchresult';
    }
    let title = BasicName[Basic.indexOf(name)];
    
    return title
};

export const getFooter = (pathname) => {
    const List = ['','search','mypage','hm_posts'];
    let name = pathname.split('/')[1];

    return !List.includes(name)
};

export const getFixed = (pathname) => {
    let name = pathname.split('/')[1];
 
    return name
}

export const NeedAlarm = (pathname) => {
    const list = ['mypage','mypage_detail','alam','search'];
    let name = pathname.split('/')[1];
    
    return !list.includes(name);
};

export const plzLogin = () => {
    if(!getToken()){
        if(window.confirm('로그인이 필요한 기능입니다 로그인 하시겠습니까?')){
            history.push('/login')
          }
          return true
    }
    return false
} 