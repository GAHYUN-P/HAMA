import { getToken, getUserId } from './cookie';

const IsLogin = () => {
    let islogin = false;
    if(getToken()){
        islogin = true;
    }
    return islogin;
};

const canWrite = (status,userId) => {
    if(!getToken()){ return false };
    if(userId === getUserId()){ return false };
    if(status !== 'opened'){ return false };
    return true;
};

const requestCanEdit = (conclusion,userId) => {
    if(conclusion !== 'opened'){return false};
    if(userId !== getUserId()){return false};
    return true;
};

const IsLike = (array) => {
    if(array.includes(getUserId())){return true};
    return false;
};

const canRate = (writerId) => {
    if(writerId !== getUserId()){return false};
    return true
};

const fileSize = (size) => {
    const fileSize = size / 1048576;
    if(fileSize > 100){
        window.alert('100MB 이하 크기의 영상만 업로드 가능합니다.')
        return true
    }
    return false
}

const alreadyRated = (writerId,star) => {
    if(writerId !== getUserId()){return false}
    if(!star){return false}
    return true
}

const infoCheck = (data,same) => {
    const { category, gender, age, nickname, phone } = data;
    if(!category || !gender || !age || !nickname){
        window.alert('빈 칸 또는 채우지않은 항목이 있습니다.');
        return true;
    }
    if(same !== 'true'){
        window.alert('닉네임 중복체크를 해주세요!');
        return true;
    }
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