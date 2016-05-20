'use strict';

var React = require('react');

var Carousel = require('nuka-carousel');

const DoctorCarousel = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <Carousel className="doctorCarousel">
        <img className="ui image" src="http://wildhunt.org/wp-content/uploads/2016/04/maxresdefault.jpg"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
      </Carousel>
    )
  }
});

export default DoctorCarousel;