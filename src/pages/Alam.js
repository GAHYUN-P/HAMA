import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { alamActions } from "../redux/modules/alam";

import AlamCard from "../components/AlamCard";
import Header from '../components/Header';

const Alam = (props) => {
    const dispatch = useDispatch();
    const { today, lastday } = useSelector(state => state.alam);

    React.useEffect(()=>{
        
    },[]);

    return(
        <React.Fragment>
            <Header />
            <div style={{width:'90%',height:'100%',margin:'auto',padding:'5rem 0'}} >
                {/* 오늘자 알림 */}
                <div style={{width:'100%', margin:'0 0 2rem'}} >
                    <div style={{display:'flex',justifyContent:'space-between'}} >
                        <div style={{color:'#FF7A7A'}} >오늘</div>
                        {today.length !==0 && 
                        <button style={{border:'none',backgroundColor:'#fff'}} >전체삭제</button>}
                    </div>

                    {/* 알림 들어가는 곳 */}
                    {today.length !==0 && 
                    <div>
                        {today.map((t,i)=>{
                            return <AlamCard key={i} />
                        })}
                    </div>}
                </div>
                
                {/* 어제자 알림 */}
                {lastday.length !== 0 &&
                <div>
                    <div>어제</div>

                    {/* 알림 들어가는 곳 */}
                    <div>
                        {lastday.map((t,i)=>{
                                return <AlamCard key={i} />
                            })}
                    </div>
                </div> }
            </div>
        </React.Fragment>
    )
}

export default Alam;