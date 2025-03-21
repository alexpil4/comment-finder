'use client';

import clsx from 'clsx';
import { XIcon } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  text: string;
  isVisible: boolean;
  arrowPosition: string;
  onClose: () => void;
}

export default function Tooltip({ children, text, isVisible, arrowPosition, onClose }: Props) {
  const setArrowPosition = clsx({
    'left-5': arrowPosition === 'left',
    'right-5': arrowPosition === 'right',
    'left-1/2': arrowPosition === 'center',
  });

  return (
    <div className="flex-grow flex flex-col items-center">
      {children}
      {isVisible && (
        <div className="absolute min-w-[290px] top-20 p-2 bg-teal-200 rounded-md text-sm shadow-md">
          {text}
          <XIcon
            onClick={onClose}
            className="inline pl-[3px] cursor-pointer"
            size={16}
            strokeWidth={3}
          />
          <div
            className={`absolute ${setArrowPosition} bottom-full border-8 border-x-transparent border-t-transparent border-b-teal-200`}
          ></div>
        </div>
      )}
    </div>
  );
}
