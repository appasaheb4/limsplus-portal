import React, {useRef} from 'react';

const getPosition = (position: 'bottom' | 'left' | 'top') => {
  if (position === 'left')
    return {
      left: -20,
      bottom: -50,
      opacity: 0,
    };
  if (position === 'top')
    return {
      left: -20,
      top: -50,
      opacity: 0,
    };
  else
    return {
      left: -20,
      bottom: -50,
      opacity: 0,
    };
};

interface TooltipProps {
  tooltipText?: any;
  position?: 'bottom' | 'left' | 'top';
  className?: string;
  children: React.ReactNode;
}

export const Tooltip: React.FunctionComponent<TooltipProps> = ({
  tooltipText,
  position = 'bottom',
  className,
  children,
}) => {
  const tipRef = useRef(null);
  const handleMouseEnter = tipRef => {
    tipRef.current.style.opacity = 1;
    // tipRef.current.style.marginLeft = "20px"
  };
  function handleMouseLeave(tipRef) {
    tipRef.current.style.opacity = 0;
    // tipRef.current.style.marginLeft = "10px"
  }
  return (
    <div
      className={`${className} relative flex items-center`}
      onMouseEnter={() => handleMouseEnter(tipRef)}
      onMouseLeave={() => handleMouseLeave(tipRef)}
    >
      <div
        className='absolute  whitespace-no-wrap bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded flex items-center transition-all duration-150 z-50'
        style={getPosition(position)}
        ref={tipRef}
      >
        <div
          className='bg-black h-3 w-3 absolute'
          style={
            position !== 'bottom'
              ? {bottom: '-6px', transform: 'rotate(45deg)'}
              : {top: '-6px', transform: 'rotate(45deg)'}
          }
        />
        <div dangerouslySetInnerHTML={{__html: tooltipText}} />
      </div>
      {children}
    </div>
  );
};
