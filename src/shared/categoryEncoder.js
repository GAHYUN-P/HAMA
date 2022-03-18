export const categoryEncoder = (category) => {
    const kr = ['먹방/요리','운동','지식','창작','방문','직업','반려동물','패션/뷰티','고민상담','가전','생활','기타']
    const eng = ['cook','health','knowledge','create','visit','job','pet','fashion','consult','device','life','etc']
    
    return  kr[eng.indexOf(category)];
};

export const typeEncoder = (type) => {
    const kr= ['댓글','대댓글','답변','평가','평가','레벨','좋아요','좋아요'];
    const eng = ['comment','child','answer','rate','rated','level','likeA','likeP'];

    return kr[eng.indexOf(type)];
};

export const statusColor = (status) => {
    let color = '#536b2c';
    
    if(status !== 'stay'){
        color = status === 'up' ? '#ff7a7a' : '#6284fe';
    }

    return color;
}