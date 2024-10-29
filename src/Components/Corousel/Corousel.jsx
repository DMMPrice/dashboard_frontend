import React from 'react';
import {CCarousel, CCarouselItem, CImage} from '@coreui/react';
import './corousel.css';

import image1 from './image-1.jpg';
import image2 from './image-2.jpg';
import image3 from './image-2.jpg';
import image4 from './image-4.jpg';
import image5 from './image-5.jpg';

function UncontrolledExample() {
    return (
        <CCarousel controls transition="crossfade">
            <CCarouselItem>
                <CImage className="d-block w-100" src={image1} alt="slide 1"/>
            </CCarouselItem>
            <CCarouselItem>
                <CImage className="d-block w-100" src={image2} alt="slide 2"/>
            </CCarouselItem>
            <CCarouselItem>
                <CImage className="d-block w-100" src={image3} alt="slide 3"/>
            </CCarouselItem>
            <CCarouselItem>
                <CImage className="d-block w-100" src={image4} alt="slide 3"/>
            </CCarouselItem>
            <CCarouselItem>
                <CImage className="d-block w-100" src={image5} alt="slide 3"/>
            </CCarouselItem>
        </CCarousel>
    );
}

export default UncontrolledExample;