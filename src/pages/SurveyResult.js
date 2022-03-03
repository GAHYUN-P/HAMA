import React from 'react';
import { utilAPI } from '../shared/api';

const SurveyResult = (props) => {
    // 데이터 불러와서 깔때 util.js에
    // thunk 만들어서 깔아주면 될듯?!
    
    React.useEffect(() => {
        const res = utilAPI.submitSurvey();
        console.log(res.data.hippoName);
        const result = res.data.hippoName;
    }, []);

  return (
    <div>
      당신의 하마는 ~이!
    </div>
  );
};

export default SurveyResult;
