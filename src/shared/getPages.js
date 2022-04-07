import { history } from "../redux/configureStore";
import { getToken } from "./cookie";

// 각 pathname이 들어가 있는 배열
const Basic =[
    '','request','requestedit','answer','answeredit','requestdetail','answerdetail',
    'comment','search','searchresult','shorts','alam','mypage','mypage_detail','hm_posts'
];
// pathname에 인덱스 별로 대응되는 페이지 별 헤더 이름이 들어가 있음
const BasicName = [
    '','요청 작성','요청 수정','답변 작성','답변 수정','게시판','게시판',
    '답글','검색하기','검색결과','숏츠','알림','마이페이지','내가 작성한 글','HM이 부탁HAMA'
];

// 해당 페이지의 헤더 이름을 판단하는 함수
export const getPage = (pathname) => {
    // 단순 pathname만을 가져옴
    let name = pathname.split('/')[1];
    // 만일 name이 request지만 split한 배열의 길이가 2보다 크면 
    // 이는 요청글 수정페이지를 의미함
    if(name === 'request' && pathname.split('/').length > 2){
        name = 'requestedit';
    }
    // 만일 name이 search split한 배열의 길이가 2보다 크면 
    // 이는 검색 결과 페이지를 의미함
    if(name === 'search' && pathname.split('/').length > 2){
        name = 'searchresult';
    }
    // 헤더의 이름은 인덱스별로 대응되는 배열에서 선정해옴
    let title = BasicName[Basic.indexOf(name)];
    
    return title
};

// 로그인 여부를 판단하여 로그인 페이지로 보내주는 함수
export const plzLogin = () => {
    if(!getToken()){
        if(window.confirm('로그인이 필요한 기능입니다 로그인 하시겠습니까?')){
            history.push('/login')
          }
          return true
    }
    return false
} 