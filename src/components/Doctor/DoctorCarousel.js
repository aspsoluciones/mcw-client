'use strict';

var React = require('react');

var Carousel = require('nuka-carousel');

var style = {
        backgroundImage: "url(//fi.realself.com/hero/3b4b9f8ee43989919a60d83fb43a3999/a/e/c/userimage-968246.jpg)"
    };
    
var decorators = [{
  component: React.createClass({
    render() {
      return (
        <button
          style={this.getButtonStyles(this.props.currentSlide === 0)}
          onClick={this.props.previousSlide}>
          <i className="large angle left icon"></i>
        </button>
      )
    },
    
    getButtonStyles(disabled) {
        return {
          border: 0,
          background: 'rgba(0,0,0,0.4)',
          color: 'white',
          padding: 10,
          outline: 0,
          opacity: disabled ? 0.3 : 1,
          cursor: 'pointer'
      }
    }
  }),
  position: 'CenterLeft'
},
{
  component: React.createClass({
    render() {
      return (
        <button
          style={this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount)}
          onClick={this.props.nextSlide}>
          <i className="large angle right icon"></i>
        </button>
      )
    },
    
    getButtonStyles(disabled) {
        return {
          border: 0,
          background: 'rgba(0,0,0,0.4)',
          color: 'white',
          padding: 10,
          outline: 0,
          opacity: disabled ? 0.3 : 1,
          cursor: 'pointer'
      }
    }
  }),
  position: 'CenterRight'
}
];

const DoctorCarousel = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    
    return (
      <div id="carousel">
        <div className="carousel-outer">
          <Carousel className="doctorCarousel" decorators={decorators}>
            <div style={{backgroundImage: "url(//fi.realself.com/hero/3b4b9f8ee43989919a60d83fb43a3999/a/e/c/userimage-968246.jpg)"}} className="carouselImage"></div>
            <div style={{backgroundImage: "url(//fi.realself.com/hero/3b4b9f8ee43989919a60d83fb43a3999/a/e/c/userimage-968246.jpg)"}} className="carouselImage"></div>
          </Carousel>
        </div>
     </div>
    )
  }
});

export default DoctorCarousel;

