const Kakao_key = 'e3318b36c5ba53a829554c965958bdb9';
const image = 'https://minki-bucket.s3.ap-northeast-2.amazonaws.com/static/sweet2.png';
let url = window.location.href.split('result')[0];

const initKakao = () => {
    if(!window.Kakao.isInitialized()){
        window.Kakao.init(Kakao_key);
      }
    url = window.location.href.split('result')[0];
}

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

const sharePostKakao = (props) => {
    const { title, content, fileList } = props

    const imgUrl = fileList.length > 0 ? fileList[0] : image;

    console.log(url);

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