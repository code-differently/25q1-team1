'use client';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const images = [
  { src: "/images/slide2.png", alt: "Fresh produce 1" },
  { src: "/images/slide1.JPEG", alt: "Fresh produce 2" },
  { src: "/images/slide3.png", alt: "Fresh produce 3" },
];

export default function Slideshow() {
  return (

    <div style={{ width: 'auto', margin: 0, padding: 0 }}>

      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={1000}
        dynamicHeight={false}
        emulateTouch
        swipeable
        stopOnHover
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              
              width: 'auto',

              height: '60vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}