import React from 'react';
import { XIcon } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  text: string;
  isVisible: boolean;
  arrowPosition: string;
  onClose: () => void;
}

export default function Tooltip({ children, text, isVisible, arrowPosition, onClose }: Props) {
  return (
    <div className="flex flex-grow flex-col items-center">
      {children}
      {isVisible && (
        <div className="absolute min-w-[290px] top-20 p-2 bg-yellow-300 rounded-md text-sm shadow-md">
          {text}
          <XIcon
            onClick={onClose}
            className="inline pl-[3px] cursor-pointer"
            size={16}
            strokeWidth={3}
          />
          <div
            className={`absolute ${
              arrowPosition === 'center' ? 'left-1/2' : `${arrowPosition}-5`
            } bottom-full border-8 border-x-transparent border-t-transparent border-b-yellow-300`}
          ></div>
        </div>
      )}
    </div>
  );
}
