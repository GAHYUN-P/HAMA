// 카카오 브라우저를 초기화하기 위한 카카오 디벨로퍼의자바스크립트 키
const Kakao_key = 'e3318b36c5ba53a829554c965958bdb9';
// 공유시 사용할 기본 이미지 url 카카오 공유 기능에는 무조건 이미지의 url이 들어가야함
const image = 'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/sweet2.png';
// 공유시 연결될 url을 지정하기 위한 주소 
let url = window.location.href.split('result')[0];

// 카카오 브라우저를 초기화 시켜주는 함수
const initKakao = () => {
  // 카카오 브라우저가 초기화 되어있는지 확인하는 조건식
  // window.Kakao.isInitialized()는 카카오 브라우저의 초기화 확인 함수
    if(!window.Kakao.isInitialized()){
      // window.Kakao.init(Kakao_key)는 카카오 브라우저를 자바스크립트 키로 초기화하는 함수 
        window.Kakao.init(Kakao_key);
      }
    // 공유시 연결될 url을 지정하기 위한 주소는 해당 초기화가 진행된 페이지의 주소로 변경됨
    url = window.location.href.split('result')[0];
}

// 설문조사 결과를 공유하기 위한 함수
const shareResultKakao = (props) => {
    const { hippoName, surveyResult, imgUrl } = props
    
    window.Kakao.Link.sendDefault({ 
      objectType: 'feed',
      content: {
        title: hippoName,
        description: surveyResult,
        imageUrl: imgUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [{title: '웹으로 보기',link: {mobileWebUrl: url,webUrl: url}}],
    })
  };

  // 요청글 또는 응답글을 공유하기 위한 함수
const sharePostKakao = (props) => {
    const { title, content, fileList } = props
    // 만일 해당 포스트 또는 요청글에 이미지 리스트가 존재하지 않는다면 
    // 기본 이미지 url을 사용함
    const imgUrl = fileList.length > 0 ? fileList[0] : image;

    window.Kakao.Link.sendDefault({ 
      objectType: 'feed',
      content: {
        title: '내가하마! ' + title,
        description: content,
        imageUrl: imgUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [{title: '웹으로 보기',link: {mobileWebUrl: url,webUrl: url}}],
    })
}

export { initKakao, shareResultKakao, sharePostKakao };