import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import PostEach from '../components/PostEach';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Wrapper } from '../elements';
import { postActions } from '../redux/modules/post';

const HMpost = (props) => {

    const dispatch = useDispatch();

    // 전체 리스트 불러오기
    React.useEffect(() => {
        dispatch(postActions.getHMPostList());
    }, []);

    // HMlist 리덕스로부터 가져오기
    const post_list = useSelector((state) => state.post.HMlist);
    console.log(post_list);

    return (
        <div>
            <Header />
            <Wrapper>
                <Grid>
                    {post_list.map((info, idx) => {
                        return (<PostEach key={info.id} {...info}/>);
                    })}
                </Grid> 
            </Wrapper>
            <Footer />
        </div>
    );
};

const Grid = styled.div`
    padding-bottom: 3.5rem;
`;

export default HMpost;