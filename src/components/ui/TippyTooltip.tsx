import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './tippy-tooltip.css';

interface TippyTooltipProps {
  content: string | React.ReactNode;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  disabled?: boolean;
  arrow?: boolean;
  className?: string;
}

const TippyTooltip: React.FC<TippyTooltipProps> = ({
  content,
  children,
  arrow = true,
  placement = 'top',
  disabled = false,
  className = 'radar-tippy-tooltip',
}) => {
  return (
    <Tippy
      content={content}
      placement={placement}
      arrow={arrow}
      disabled={disabled || !content}
      className={className}
    >
      {children}
    </Tippy>
  );
};

export default TippyTooltip;

