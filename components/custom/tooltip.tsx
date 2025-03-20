import React from 'react';
import { XIcon } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  text: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function TooltipProvider({ children, text, isVisible, onClose }: Props) {
  return (
    <div className="w-full flex flex-col items-center relative">
      {children}
      {isVisible && (
        <div className="absolute left-1/2 bottom-[-50px] -translate-x-1/2 p-2 bg-amber-200 rounded-md text-sm shadow-md">
          {text}
          <XIcon
            onClick={onClose}
            className="inline pl-[3px] cursor-pointer"
            size={16}
            strokeWidth={3}
          />
          <div className="absolute left-1/2 bottom-full -translate-x-1/2 border-8 border-x-transparent border-t-transparent border-b-amber-200"></div>
        </div>
      )}
    </div>
  );
}
