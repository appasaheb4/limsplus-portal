import React from 'react';

interface CarouselProps {
  images?: string[];
}

export const Carousel = (props: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  return (
    <div className="overflow-hidden relative">
      <div
        style={{
          width: (props.images?.length || 1) * 100 + '%',
          transform: `translateX(${
            -(currentSlide / (props.images?.length || 1)) * 100
          }%)`,
        }}
        className="flex flex-row items-start transition-transform ease-in-out duration-500"
      >
        {props.images?.map((image, key) => (
          <img
            key={key}
            src={image}
            style={{width: 100 / (props.images?.length || 1) + '%'}}
            alt={image}
          />
        ))}
      </div>
      {currentSlide > 0 && (
        <button
          style={{transform: 'translateY(-50%)'}}
          onClick={() => setCurrentSlide(currentSlide - 1)}
          className="absolute w-6 h-6 bg-white rounded-full top-1/2 left-2 flex justify-center items-center shadow-sm hover:shadow-lg"
        >
          <svg
            className="w-4 h-4 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      {currentSlide < (props.images?.length || 1) - 1 && (
        <button
          style={{transform: 'translateY(-50%)'}}
          onClick={() => setCurrentSlide(currentSlide + 1)}
          className="absolute w-6 h-6 bg-white rounded-full top-1/2 right-2 flex justify-center items-center shadow-sm hover:shadow-lg"
        >
          <svg
            className="w-4 h-4 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
