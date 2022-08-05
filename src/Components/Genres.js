import React, { Component } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import NumberPage from './NumberPage';
import MyContext from '../Context/MyContext'; 


class Genres extends Component{
    static contextType = MyContext
    fetchGenres = async () => {
        let search = new URLSearchParams(window.location.search)
        let genreTitle = search.get('genreTitle')
        let genre = search.get('genre')
        let current = search.get('page');
        this.context.setState({
            base : {...this.context.state.base , genremovie : {...this.context.state.base.genremovie , title :  genreTitle}}
        })

        let result = await axios.get(`https://moviesapi.ir/api/v1/genres/${genre}/movies?page=${current}`)

        this.context.setState({
            base : {...this.context.state.base , genremovie : {...this.context.state.base.genremovie , movie :  result.data.data , metaData : result.data.metadata} }
        })
 
        let count = result.data.metadata.page_count
        let pagesSite = [];
        for(let i =1;i<=count;++i)
        {
            if(Math.abs(i-result.data.metadata.current_page) < 6){
                pagesSite.push(i)
            }
        }

        this.context.setState({
            base : {...this.context.state.base , genremovie : {...this.context.state.base.genremovie , pages : pagesSite  } }
        })
    }

    componentDidMount(){
        this.fetchGenres()
    }

    componentDidUpdate(){
        if(this.props.reder != false )
        {   
            this.fetchGenres()
            this.context.setState({
                base : {...this.context.state.base , reder : false}
            })
        }
    }
    render()
        {
            return(
                <div className='cardbox' style={this.context.state.base.header.pos === 'night' 
                    ? {backgroundColor : '#262626'} 
                    : {backgroundColor : '#F1F1F1' }}>

                    <div className="cardbox-title">
                        <h3 className='toto' style={this.context.state.base.header.pos === 'night' 
                            ? {color : '#fff'} 
                            : {color : '#000000' }}>ژانر {this.context.state.base.genremovie.title}
                        </h3>
                    </div>
                    <div className='cardWrapper'>
                        {
                            this.context.state.base.genremovie.movie &&
                            this.context.state.base.genremovie.movie.map(movie => (<Card key={movie.id} info={movie}/>))
                        }
                    </div>

                    <ul className={ this.context.state.base.header.pos === 'night' 
                        ? "numberPage" 
                        : 'numberPage-day'}>

                        {
                            this.context.state.base.genremovie.pages &&
                            this.context.state.base.genremovie.pages.map(item => 
                            (<NumberPage key={item} info={item}  meta={this.context.state.base.genremovie.metaData} />))
                        }
                    </ul>
            </div>

            )
            
        }

}



export default Genres;