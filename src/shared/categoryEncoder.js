export const categoryEncoder = (category) => {
    const kr = ['먹방/요리','운동','지식','창작','방문','직업','반려동물','패션/뷰티','고민상담','가전','생활','기타']
    const eng = ['cook','health','knowledge','create','visit','job','pet','fashion','consult','device','life','etc']
    
    return  kr[eng.indexOf(category)];
}