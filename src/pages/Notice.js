import React from 'react';

import Header from '../components/Header';
import { Wrapper } from '../elements';

import styled from 'styled-components';

const Notice = (props) => {


  return (
    <React.Fragment>
        <Header />
        <Wrapper>
            <Paragraph>
                <Title>
                    서비스 소개
                </Title>
                <Contents>
                    먹방, 여행브이로그, 게임영상, 전자기기 리뷰 등<br/>
                    유투버들의 컨텐츠에서 대리만족을 찾고 계시나요?!<br/><br/>
                    저희 내가HAMA 서비스는 유투버들의 대리만족<br/> 
                    컨텐츠들과 달리 개인이 대리만족하고싶은 것들을<br/>
                    공개적으로 요청하고 모든 유저가 블로거이자<br/>
                    스트리머가 되어서 답변으로 컨텐츠를
                    만들어가는 서비스입니다!<br/><br/>

                    내가 원하는 부분을 간접경험으로 대리만족하고<br/>
                    다른 분들의 요청에 답변을해주면서 내가 경험한것을<br/> 
                    자랑도하고 타인을 행복하게하는 보람도 얻어가세요 :)
                </Contents>
            </Paragraph>
            <Paragraph>
                <Title>
                    사이트 이용 주의사항
                </Title>
                <Contents>
                    유저분들 피드백에 따른 서비스 개선을 위해<br/>
                    서버가 여러번 다시 켜질 수가 있습니다<br/>
                    기능 이용에 문제가 있다면 마이페이지에서<br/>
                    <Caution>로그아웃 한번 하시고 재로그인하시는 것을 권장드립니다.</Caution>
                </Contents>
            </Paragraph>
            <Paragraph>
                <Title>
                    이벤트 소개
                </Title>
                <Contents>
                    <SemiTitle>1. 관리자의 요청에 답변HAMA</SemiTitle>
                    관리자의 요청에 답변을 하여서 추가 exp를<br/> 
                    획득해보세요.<br/><br/>

                    <SemiTitle>2. 내가HAMA를 평가HAMA</SemiTitle>
                    메인 하단바의 평가하기를 눌러서 내가HAMA<br/>
                    서비스에 대한 설문을 진행해주세요!<br/>
                    새싹 개발자들에게 큰 도움이 됩니다 :)<br/>
                    설문을 완료하면 200exp도 드려요!<br/>
                    * 설문 당일 24시 exp 일괄지급<br/><br/>

                    <SemiTitle>3. exp 랭킹에 따라 배달의 민족 쿠폰을 쏩니다!</SemiTitle>
                    exp 랭킹 1위 10만원, 2위 6만원, 3위 4만원 상당의<br/>
                    배달의 민족 쿠폰을 드립니다.<br/>
                    * 서비스 종료일(22.03.31) 24시 기준<br/>
                    * 22.04.02에 지급<br/><br/>


                    <SemiTitle>4. 인스타그램 해시태그 인증하고 스벅 기프티콘 팡팡!</SemiTitle>
                    마이페이지의 업적을 모두 달성하고 마이페이지를<br/> 
                    닉네임과 함께 캡쳐해서 #내가HAMA 태그와 함께 <br/>
                    업로드 해주시면 추첨을 통해 스타벅스 기프티콘을 드립니다!<br/>
                    * 서비스 종료일(22.03.31) 24시 기준<br/>
                    * 22.04.02에 지급<br/><br/>
                    
                    <Caution>
                        ** 주의<br/>
                        배달의 민족 쿠폰 이벤트, 스타벅스 기프티콘 이벤트는<br/>
                        최초 회원정보 기입시 휴대폰 번호를 입력해주신 분들에 한해서 참여가능합니다.
                    </Caution>
                </Contents>
            </Paragraph>
            <Paragraph>
                <Title>
                    경험치/레벨업 시스템
                </Title>
                <Contents>
                    exp 1000점을 채우면 하마가 레벨업 하면서<br/> 
                    프로필이 화려해집니다!<br/>
                    최대 레벨은 3레벨 입니다.<br/>
                    3레벨을 달성해서 완성된 하마 프로필을 얻어보세요.<br/><br/>

                    하마 프로필이 없다면 마이페이지에서 하마 테스트를<br/>
                    진행하시면 성향에 맞는 하마 캐릭터 프로필사진을<br/>
                    획득할 수 있습니다.<br/>
                </Contents>
            </Paragraph>
            <Paragraph>
                <Title>
                    숙련도 뱃지 시스템
                </Title>
                <Contents>
                한 카테고리에서 답변을 다섯개 이상 남기시면<br/>
                숙련도 뱃지를 획득할 수 있습니다.<br/>
                숙련도 뱃지를 획득한 분야에서 답변을 작성하면<br/> 
                50exp를 획득합니다.<br/>
                </Contents>
            </Paragraph>
            <Paragraph>
                <Title>
                    EXP 얻는 방법
                </Title>
                <Contents>
                    <SemiTitle>1. 고마워요</SemiTitle>
                    답변을 남기면 요청자의 만족도 평가에따라<br/>
                    exp를 획득합니다.<br/>
                    만족도 1점 - 100점, 2점 - 200점, 3점 - 300점, <br/>
                    4점 - 400점, 5점 - 500점<br/><br/>

                    <SemiTitle>2. 다다익선</SemiTitle>
                    자신이 요청한 글에 달린 답변글에 만족도 평가를 할 경우<br/>
                    평가마다 50exp를 획득합니다.<br/><br/>

                    <SemiTitle>3. 자신있지</SemiTitle>
                    내가 설정한 관심사 카테고리와 같은 요청글에<br/>
                    답변을 남기면 50exp를 획득합니다.<br/><br/>

                    <SemiTitle>4. 마감임박</SemiTitle>
                    마감시간이 1시간 이내이고 답변글이 없는 요청글에 <br/>
                    답변을 남기면 50exp를 획득합니다.<br/><br/>

                    <SemiTitle>5. 좋아하마</SemiTitle>
                    좋아요를 받을때마다 25exp를 획득합니다.<br/><br/>

                    <SemiTitle>6. 특별하마</SemiTitle>
                    관리자가 요청한 게시물에 답변을 남기면<br/>
                    만족도 평가에 따라<br/>
                    만족도 1점 - 150점, 2점 - 300점, 3점 - 450점, <br/>
                    4점 - 600점, 5점- 750점<br/><br/>

                    <SemiTitle>7. 숙련하마</SemiTitle>
                    숙련도 뱃지를 획득한 분야에서 답변을 작성하면<br/>
                    50exp를 획득합니다.<br/><br/>

                    <Caution>
                    ** 주의<br/>
                    정당하지 못한 방법(eg.과도하게 성의없는 글)으로 경험치를 취득할 시 관리자가 경험치를 리셋할 수 있습니다.
                    </Caution>
                </Contents>
            </Paragraph>
        </Wrapper>
    </React.Fragment>
  );
};

const Paragraph = styled.div`
    margin: 1.5rem 0px;
    padding: 1rem;
    background-color: #EFEFEF;
    border-radius: 10px;
`;

const Title = styled.div`
    font-family: 'Noto-Sans-KR-M';
    font-size: ${({ theme }) => theme.fontSizes.xl};
    padding-bottom: 10px;
`;

const SemiTitle = styled.div`
    font-family: 'Noto-Sans-KR-M';
    font-weight: 550;
`;

const Contents = styled.div`

`;

const Caution = styled.div`
    color: #FF7A7A;
`;


export default Notice;
