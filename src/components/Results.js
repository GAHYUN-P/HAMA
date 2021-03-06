import React from "react";

import { history } from "../redux/configureStore";

import { getSearchContent } from "../shared/separator";
import { categoryEncoder } from "../shared/categoryEncoder";

import NR from '../assets/no_result.svg'

import styled from "styled-components";

const Results = (props) => {
    // 검색결과를 나타내는 컴포넌트
    // list: 넘겨받은 검색결과들의 배열
    // is_request: 요청글 배열인지 답변글 배열인지 판단하게 해주는 역할
    // keyword: 어떤 단어를 검색했는지 알려주는 역할
    // separator에서 어떤 단어를 기준으로 내용을 잘라낼지 알 수 있도록 해줌 *separator 참조
    const { list, is_request, keyword } = props;

    // 검색결과가 없으면 보여줄 이미지
    if(list.length === 0){
        return (
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                   <NoResult src={NR} />
                </div>
                )
    };

    return(
        <React.Fragment>
            <Grid>
                {list.map((l,i)=>{
                    return (
                        <ResultGrid key={i}>
                            {/* 카테고리 */}
                            <CategoryGrid>
                                {categoryEncoder(l.category)}
                            </CategoryGrid>

                            {/* 제목,내용 */}
                            <PostGrid onClick={()=>{
                            if(is_request){history.push(`/requestdetail/${l.id}`)}
                            if(!is_request){history.push(`/answerdetail/${l.id}`)}
                            }} >
                                <div>
                                    <TitleGrid>
                                        {l.title}
                                    </TitleGrid>

                                    {/* 해당 검색 결과글에 키워드가 있다면 보여줌 
                                    *separator 참조 */}
                                    {getSearchContent(l.content,keyword) &&
                                    <ContentGrid>
                                        {getSearchContent(l.content,keyword).split('/')[0] ? 
                                        '...' + getSearchContent(l.content,keyword).split('/')[0] : ''}
                                           <KeyWord>
                                                {keyword}
                                           </KeyWord>
                                        {getSearchContent(l.content,keyword).split('/')[1]}...
                                    </ContentGrid>}
                                    
                                    
                                </div>
                                
                                <ImageGrid>
                                    {l.file? <Elimg src={l.file} /> : ''}
                                </ImageGrid>

                            </PostGrid>
                            {/* 시간 */}

                            <TimeGrid>
                                {l.modifiedAt}
                            </TimeGrid>
                        
                        </ResultGrid>
                    )
                })}
            </Grid>
        </React.Fragment>
    )
}

const NoResult = styled.img`
    margin-top: 6rem;
    width: 9rem;
`;

const Grid = styled.div`
    padding: 0 ${({theme})=> theme.paddings.default} 0;
`;

const ResultGrid = styled.div`
    display: flex;
    border-bottom: solid .1rem #f5f5f5;
    padding: ${({theme})=> theme.paddings.default} 0;
`;

const CategoryGrid = styled.div`
    width: 6rem;
    margin-right: .1rem;
    color: #9e9e9e;
`;

const PostGrid = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const TitleGrid = styled.div`
    font-size: ${({theme})=> theme.fontSizes.lg};
    margin-bottom: ${({theme})=> theme.margins.small};
`;

const ContentGrid = styled.div`
    padding-left: .2rem;
    color: #666;
`;

const KeyWord = styled.span`
    font-weight: 600;
`;

const ImageGrid = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: .3rem;
`;

const TimeGrid = styled.div`
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #9e9e9e;
`;

const Elimg = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: .3rem;
`;

export default Results;