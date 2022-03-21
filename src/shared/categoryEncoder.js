const kr = ['먹방/요리','운동','지식','창작','방문','직업','반려동물','패션/뷰티','고민상담','가전','생활','기타']
const eng = ['cook','health','knowledge','create','visit','job','pet','fashion','consult','device','life','etc']

export const categoryEncoder = (category) => {    
    return  kr[eng.indexOf(category)];
};
export const EngCategoryEncoder = (category) => {
    return  eng[kr.indexOf(category)];
};

export const typeEncoder = (type) => {
    const kr= ['댓글','대댓글','답변','평가','평가','레벨','좋아요','좋아요','경험치'];
    const eng = ['comment','child','answer','rate','rated','level','likeA','likeP','point'];
    return kr[eng.indexOf(type)];
};

export const statusColor = (status) => {
    let color = '#536b2c';
    if(status !== 'stay'){
        color = status === 'up' ? '#ff7a7a' : '#6284fe';
    }
    return color;
}

export const Categories = ['먹방/요리','운동','지식','창작','방문','직업','반려동물','패션/뷰티','고민상담','가전','생활','기타'];

export const CategoriesForMain = [
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