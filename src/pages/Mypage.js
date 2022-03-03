import React from 'react';
import { utilActions } from '../redux/modules/util';
import { useSelector,useDispatch } from 'react-redux';

const Mypage = (props) => {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(utilActions.getBanner());
    }, []);

    const nickname = useSelector((state) => state.util.list.nickname);
    const email = useSelector((state) => state.util.list.email);
    const hippoName = useSelector((state) => state.util.list.hippoName);
    const point = useSelector((state) => state.util.list.point);
    const hippolv = useSelector((state) => state.util.list.hippolv);

  return (
    <div>
      <div>{nickname} | {email} | {hippoName} | {point} | {hippolv}</div>
      <div>업적</div>
      <div>내가쓴글</div>
    </div>
  );
};

export default Mypage;
