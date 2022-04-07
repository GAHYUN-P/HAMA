import { getToken, getUserId } from './cookie';

// 로그인 상태를 체크하는 함수
const IsLogin = () => {
    // 현재 유저의 토큰이 있다면 로그인 상태로 판단
    if(getToken()){
        return true
    }
    return false;
};

// 요청글의 답글쓰기 버튼을 보여줄지 여부를 판단하는 함수
const canWrite = (status,userId) => {
    // 로그인 상태가 아니면 못 씀
    if(!getToken()){ return false };
    // 요청글 작성자는 못 씀
    if(userId === getUserId()){ return false };
    // 현재 요청글이 공개 상태가 아니라면 못 씀
    if(status !== 'opened'){ return false };
    return true;
};

// 요청글을 수정할 수 있는지 여부를 판단하는 함수
const requestCanEdit = (conclusion,userId) => {
    // 요청글이 공개 상태가 아니라면 수정 못 함
    if(conclusion !== 'opened'){return false};
    // 요청글 작성자가 아니면 수정 못 함
    if(userId !== getUserId()){return false};
    return true;
};

// 해당 유저가 좋아요를 눌렀는지 여부를 판단하는 함수
const IsLike = (array) => {
    // 좋아요한 유저들 아이디 리스트에 해당 유저의 아이디 포함 여부로 판단
    if(array.includes(getUserId())){return true};
    return false;
};

// 해당 유저가 해당 답변글을 평가할 수 있는지 여부를 판단하는 함수
const canRate = (writerId) => {
    // 해당 답변글이 작성된 요청글의 작성자 만이 평가 가능
    if(writerId !== getUserId()){return false};
    return true
};

// 해당 답변글이 이미 평가되었는지 판단하는 함수
const alreadyRated = (writerId,star) => {
    // 해당 요청글의 작성자가 아니면 보여주지않음
    if(writerId !== getUserId()){return false}
    // 받은 점수가 없다면 보여주지않음
    if(!star){return false}
    return true
}

// 동영상 파일의 용량을 제한하는 함수
const fileSize = (size) => {
    // 데이터 사이즈를 mb단위로 알려주기위한 공정
    const fileSize = size / 1048576;
    if(fileSize > 100){
        window.alert('100MB 이하 크기의 영상만 업로드 가능합니다.')
        return true
    }
    return false
}

// 유저 정보를 입력하는 파트에서 사용하는 조건식
const infoCheck = (data,same) => {
    const { category, gender, age, nickname, phone } = data;
    // 필수항목 중 빈칸이 있는지 판단하는 조건식
    if(!category || !gender || !age || !nickname){
        window.alert('빈 칸 또는 채우지않은 항목이 있습니다.');
        return true;
    }
    // 닉네임 중복체크를 했는지 여부를 판단하는 조건식
    if(same !== 'true'){
        window.alert('닉네임 중복체크를 해주세요!');
        return true;
    }
    // 전화번호를 체크하는 조건식
    if(phone){
        let length = phone.split('-').length;
        if(length !== 3 || 
            phone.split('-')[0] !== '010' ||
            phone.split('-')[1].length !== 4 || 
            phone.split('-')[2].length !== 4 ||
            !Number(phone.split('-')[0] + phone.split('-')[1] + phone.split('-')[2]) ){
            window.alert('전화번호 형식을 010-0000-0000에 맞춰서 다시 입력해주세요.')
            return true
        }
    }
    return false;
}

export { 
    IsLogin, 
    canWrite, 
    requestCanEdit, 
    IsLike, 
    canRate,
    infoCheck,
    fileSize,
    alreadyRated,
};