import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick//slick-theme.css';
import * as env from '../../enviroments';

export default class SliderPhotosComponent extends Component {
    render() {
        let listPhotos = this.props.photos.map((photo, index) => {
            if (photo.poster_path) {
                return (
                    <div key={ `photo-${index}` }>
                        <img
                            className="photo-slider"
                            src={ `${env.urlImageThumb}${photo.poster_path}` }
                        />
                    </div>
                )
            }
        })
        return (
            <Slider
                dots={ false }
                infinite={ true }
                speed={ 500 }
                slidesToShow={ 4 }
                slidesToScroll={ 4 }
                lazyLoad={ true }
            >
                { listPhotos }
            </Slider>
        );
    }
}