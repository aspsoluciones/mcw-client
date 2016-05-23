'use strict';

var React = require('react');

var Carousel = require('nuka-carousel');

var style = {
        backgroundImage: "url(//fi.realself.com/hero/3b4b9f8ee43989919a60d83fb43a3999/a/e/c/userimage-968246.jpg)"
    };

const DoctorCarousel = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    
    return (
      <div id="carousel">
        <div className="carousel-outer">
          <Carousel className="doctorCarousel">
            <div style={{backgroundImage: "url(//fi.realself.com/hero/3b4b9f8ee43989919a60d83fb43a3999/a/e/c/userimage-968246.jpg)"}} className="carouselImage"></div>
            <div style={{backgroundImage: "url(//fi.realself.com/hero/3b4b9f8ee43989919a60d83fb43a3999/a/e/c/userimage-968246.jpg)"}} className="carouselImage"></div>
          </Carousel>
        </div>
     </div>
    )
  }
});

export default DoctorCarousel;