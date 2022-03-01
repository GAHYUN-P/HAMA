import React, { useState, useRef } from 'react';
import axios from 'axios';

import QuillEditor from '../components/QuillEditor';
import ComplexUpload from '../components/ComplexUpload';

const Answer = (props) => {


    return (
        <React.Fragment>
            <div style={{padding:'8px' ,display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center' }} >
                <QuillEditor />
                <ComplexUpload />
            </div>
        </React.Fragment>
    )
}

export default Answer;