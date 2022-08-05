import React, { useContext } from "react";
import MyContext from '../Context/MyContext';

const ProgrammerInfo = () => {
    const context = useContext(MyContext)
    return (
        <>
            <div className="programmerpage" style={context.state.base.header.pos === 'night' 
                ? {backgroundColor : '#262626'} 
                : {backgroundColor : '#F1F1F1' }}>
                <div className="cardbox-title">
                    <h3 style={context.state.base.header.pos === 'night' 
                        ? {color : '#fff'} 
                        : {color : '#000000' }}>اطلاعات برنامه نویس
                    </h3>   
                </div>
                <div className="cardWrapper">
                    <div className="infoWrapper" >
                        <h3 style={context.state.base.header.pos === 'night' 
                            ? {color : '#fff'} 
                            : {color : '#000000' }}>علی حیاتی
                        </h3>
                        <h3 style={context.state.base.header.pos === 'night' 
                            ? {color : '#fff'} 
                            : {color : '#000000' }}>alihayati511@gmail.com
                        </h3>
                    </div>

                    
                </div>  
            </div>
        </>
    )
}


export default ProgrammerInfo;