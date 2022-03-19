import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"; // style-reset 패키지

// import pretendard from 'pretendard';

const GlobalStyles = createGlobalStyle` 
    ${reset}
    a {
        text-decoration: none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
    }
    body {
        color: #474D56;
        font-family: noto-sans-cjk-kr, sans-serif;
        font-size: 14px;
        line-height: 18px;
        background-color: rgba(var(--b3f,250,250,250),1);
        color: #000;
    }
    button {
        border: none;
    }
    &::-webkit-scrollbar { display: none; };
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    };
    hr {
        margin: 0px;
    }
`;

export default GlobalStyles;