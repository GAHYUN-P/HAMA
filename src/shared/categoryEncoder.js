// 카테고리의 한글과 영어 배열 서로 대응되는 단어를 같은 인덱스에 배치함
const kr = ['먹방/요리','운동','지식','창작','방문','직업','반려동물','패션/뷰티','고민상담','가전','생활','기타']
const eng = ['cook','health','knowledge','create','visit','job','pet','fashion','consult','device','life','etc']

// 한글 카테고리 영어로 바꿔줌
const categoryEncoder = (category) => {
    // 받아온 category의 eng배열에서의 인덱스를 가져와 kr배열에 해당 인덱스를 가져옴
    return kr[eng.indexOf(category)];
};

// 영어 카테고리 한글로 바꿔줌
const EngCategoryEncoder = (category) => {
    // 받아온 category의 kr배열에서의 인덱스를 가져와 eng배열에 해당 인덱스를 가져옴
    return eng[kr.indexOf(category)];
};

// 알람 타입 영어에서 한글로 바꿔줌
const typeEncoder = (type) => {
    // 대응되는 타입의 영어와 한글을 같은 인덱스에 배치함 
    const kr= ['댓글','대댓글','답변','평가','평가','레벨','좋아요','좋아요','경험치','경험치','경험치','경험치','경험치','완료','업적'];
    const eng = [
        'comment','child','answer','rate','rated','level','likeA','likeP',
        'pointRD','pointR','pointAL','pointPL','pointA','answerC','achieve'
    ];
    // 받아온 category의 eng배열에서의 인덱스를 가져와 kr배열에 해당 인덱스를 가져옴
    return kr[eng.indexOf(type)];
};

// 랭크 상태에 따라 색깔 돌려줌
const statusColor = (status) => {
    // 기본 색상 status: stay
    let color = '#536b2c';
    if(status !== 'stay'){
        color = status === 'up' ? '#ff7a7a' : '#6284fe';
    }
    return color;
};

// 버튼에 사용하기 위한 카테고리 export
const Categories = kr;

// 메인페이지에서 사용하기위한 객체 배열
const CategoriesForMain = [
    {category:'전체보기',value:'all'},
    {category:'먹방/요리',value:'cook'},
    {category:'운동',value:'health'},
    {category:'지식',value:'knowledge'},
    {category:'창작',value:'create'},
    {category:'방문',value:'visit'},
    {category:'직업',value:'job'},
    {category:'반려동물',value:'pet'},
    {category:'패션/뷰티',value:'fashion'},
    {category:'고민상담',value:'consult'},
    {category:'가전',value:'device'},
    {category:'생활',value:'life'},
    {category:'기타',value:'etc'},
];

export {
    CategoriesForMain, 
    Categories, 
    statusColor, 
    typeEncoder, 
    EngCategoryEncoder, 
    categoryEncoder 
};