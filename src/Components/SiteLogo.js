import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard} from '@fortawesome/free-solid-svg-icons';
import MyContext from '../Context/MyContext';

const SiteLogo = ()=>{ 

    const context = useContext(MyContext)
    return(
        <div  className='header-site'>
            <div className='header-banner' >

                <h1 className='banner-title' style={context.state.base.header.pos === 'night' 
                    ? {color : '#fff'} 
                    : {color : '#000000'}}>TOP <span >MOVIES</span> 
                </h1>

                <p className='sub-title' style={context.state.base.header.pos === 'night' 
                    ? {color : '#fff'} 
                    : {color : '#000000'}}>List of top 250 movies
                </p>

            </div>

            <a href='#' className='header-siteLogo '>
                <FontAwesomeIcon icon={faClapperboard} />
            </a>
        </div>
    )
}



export default SiteLogo;


