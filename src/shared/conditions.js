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

export { 
    IsLogin, 
    canWrite, 
    requestCanEdit, 
    IsLike, 
    canRate,
    
};