import React, {useRef} from 'react';
import * as Material from '@mui/material';

interface TooltipProps {
  tooltipText?: any;
  position?: 'bottom' | 'left' | 'top';
  className?: string;
  children?: any;
}

export const Tooltip: React.FunctionComponent<TooltipProps> = ({
  tooltipText,
  position = 'bottom-start',
  children,
}) => {
  const positionRef = React.useRef<{x: number; y: number}>({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef<any>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = {x: event.clientX, y: event.clientY};

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };
  return (
    <Material.Tooltip
      title={tooltipText}
      placement='bottom-start'
      arrow
      PopperProps={{
        popperRef,
        anchorEl: {
          getBoundingClientRect: () => {
            return new DOMRect(
              positionRef.current.x,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              areaRef.current!.getBoundingClientRect().y + 22,
              0,
              0,
            );
          },
        },
      }}
    >
      <Material.Box ref={areaRef} onMouseMove={handleMouseMove}>
        {children}
      </Material.Box>
    </Material.Tooltip>
  );
};
