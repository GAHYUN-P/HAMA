import React from 'react';
import { utilActions } from '../redux/modules/util';
import { useSelector,useDispatch } from 'react-redux';
import Medal from '../components/Medal';

const Mypage = (props) => {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(utilActions.getBanner());
        dispatch(utilActions.getAchievement());
    }, []);

    const nickname = useSelector((state) => state.util.list.nickname);
    const email = useSelector((state) => state.util.list.email);
    const hippoName = useSelector((state) => state.util.list.hippoName);
    const point = useSelector((state) => state.util.list.point);
    const hippolv = useSelector((state) => state.util.list.hippolv);

    // const achievement_list =  useSelector((state) => state.util.achievement);
    // console.log(achievement_list);
    

  return (
    <div>
      <div>{nickname} | {email} | {hippoName} | {point} | {hippolv}</div>
      {/* {achievement_list.map((info, idx) => {
                return (
                  <Medal></Medal>
                );
            })} */}
      <div>내가쓴글</div>
    </div>
  );
};

export default Mypage;
