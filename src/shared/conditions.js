import { getToken, getUserId } from './cookie';

const IsLogin = () => {
    let islogin = false;
    if(getToken()){
        islogin = true;
    }
    return islogin;
};

const canWrite = (status,userId) => {
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
    if(fileSize > 70){
        window.alert('영상이 너무커요 ㅠㅠ')
        return true
    }
    return false
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
            window.alert('전화번호는 010-0000-0000로 맞춰주세요')
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
};