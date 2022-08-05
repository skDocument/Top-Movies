import React,{Component} from "react";
import SlideShow from "./layouts/SlideShow";
import AboutUs from "./layouts/AboutUs";
import Content from "./layouts/Content";
import MyContext from './Context/MyContext';



class Home extends Component{

    static contextType = MyContext;

    render(){
        return (
            <React.Fragment>
                <SlideShow />
                <AboutUs changeOfferMovie={this.context.state.base.firebase.changeOfferMovie} />
                <Content />
            </React.Fragment>
        )
    }
}



export default Home;