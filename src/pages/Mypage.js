import React from 'react';
import { utilActions } from '../redux/modules/util';
import { useSelector,useDispatch } from 'react-redux';

const Mypage = (props) => {

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(utilActions.getBanner());
    }, []);

    const banner_info = useSelector((state) => state.post.list);

  return (
    <div>
      <div>mypage 헤더</div>
      <div>업적</div>
      <div>내가쓴글</div>
    </div>
  );
};

export default Mypage;
