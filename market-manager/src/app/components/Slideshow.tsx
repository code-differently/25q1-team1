'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const images = [
  { src: '/images/slide2.png', alt: 'Fresh produce 1' },
  { src: '/images/slide1.JPEG', alt: 'Fresh produce 2' },
  { src: '/images/slide3.png', alt: 'Fresh produce 3' },
];

export default function Slideshow() {
  return (

    <div style={{ width: '100%', overflow: 'hidden' }}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={1000}
        emulateTouch
        swipeable
        stopOnHover
        showArrows={false}
      >
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              width: '100%',
              height: '65vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e7f0db',
      }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition:
                  img.alt === 'Fresh produce 2' ? 'center 30%' : 'center center',
              }}
            />
          </div>
))}
      </Carousel>
    </div>
  );
}