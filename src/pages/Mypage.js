import React from 'react';
import { mypageActions } from '../redux/modules/mypage';
import { useSelector,useDispatch } from 'react-redux';
import Medal from '../components/Medal';
import MypostList from '../components/MypostList';
import MyanswerList from '../components/MyanswerList';
import Header from '../components/Header';
import { history } from '../redux/configureStore';

const Mypage = (props) => {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(mypageActions.getBanner());
        dispatch(mypageActions.getAchievement());
        dispatch(mypageActions.getUserInfo());
    }, []);

    const nickname = useSelector((state) => state.mypage.list.nickname);
    const email = useSelector((state) => state.mypage.list.email);
    const hippoName = useSelector((state) => state.mypage.list.hippoName);
    const point = useSelector((state) => state.mypage.list.point);
    const hippolv = useSelector((state) => state.mypage.list.hippolv);

    const achievement_list =  useSelector((state) => state.mypage.achievement);
    console.log(achievement_list);

    const onClickMypost = (e) => {
      dispatch(mypageActions.setDetail(e.target.value));
      history.push('/mypage_detail');
    }

    const onClickMyanswer = (e) => {
      dispatch(mypageActions.setDetail(e.target.value));
      history.push('/mypage_detail');
    }

  return (
    <div>
      <Header />
      <div>{nickname} | {email} | {hippoName} | {point} | {hippolv}</div>
      {achievement_list.map((info, idx) => {
                return (
                  <Medal
                    value = {info}/>
                );
            })}
      <hr/>
      <MypostList/>
      <button onClick={(e)=>{onClickMypost(e)}} value='mypost'>더보기</button>
      <hr/>
      <MyanswerList/>
      <button onClick={(e)=>{onClickMyanswer(e)}} value='myanswer'>더보기</button>
    </div>
  );
};

export default Mypage;
