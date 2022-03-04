import React from 'react';
import { utilAPI } from '../shared/api';
import { utilActions } from '../redux/modules/util';
import { useSelector,useDispatch } from 'react-redux';

const SurveyResult = (props) => {
    // 데이터 불러와서 깔때 util.js에
    // thunk 만들어서 깔아주면 될듯?!
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(utilActions.getSurveyResult())
    }, []);

    const hippoName = useSelector((state)=>state.util.result.hippoName);
    console.log(hippoName);

  return (
    <div>
      당신은 {hippoName}!
    </div>
  );
};

export default SurveyResult;
