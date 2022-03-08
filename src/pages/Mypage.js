import React from 'react';
import { mypageActions } from '../redux/modules/mypage';
import { useSelector,useDispatch } from 'react-redux';
import Medal from '../components/Medal';
import MypostList from '../components/MypostList';
import MyanswerList from '../components/MyanswerList';
import { history } from '../redux/configureStore';

const Mypage = (props) => {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(mypageActions.getBanner());
        dispatch(mypageActions.getAchievement());
    }, []);

    const nickname = useSelector((state) => state.mypage.list.nickname);
    const email = useSelector((state) => state.mypage.list.email);
    const hippoName = useSelector((state) => state.mypage.list.hippoName);
    const point = useSelector((state) => state.mypage.list.point);
    const hippolv = useSelector((state) => state.mypage.list.hippolv);

    const achievement_list =  useSelector((state) => state.mypage.achievement);
    console.log(achievement_list);

  return (
    <div>
      <div>{nickname} | {email} | {hippoName} | {point} | {hippolv}</div>
      {achievement_list.map((info, idx) => {
                return (
                  <Medal
                    value = {info}/>
                );
            })}
      <hr/>
      <MypostList/>
      <button onClick={()=> history.push('/')}>더보기</button>
      <hr/>
      <MyanswerList/>
      <button>더보기</button>
    </div>
  );
};

export default Mypage;
