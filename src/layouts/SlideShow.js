import React, { Component} from "react";
import slide1 from '../Adds/img/slide1.jpg';
import slide2 from '../Adds/img/slide2.jpg';
import slide3 from '../Adds/img/slide3.jpg';


class SlideShow extends Component{

    render(){
        return(
            <section>
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img src={slide1} class="d-block w-100"  />
                        </div>
                        <div class="carousel-item">
                        <img src={slide2} class="d-block w-100" />
                        </div>
                        <div class="carousel-item">
                        <img src={slide3} class="d-block w-100" />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
        )
    }



}



export default SlideShow;