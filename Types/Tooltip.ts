export interface TooltipProps {
  children: React.ReactNode;
  text: string;
  isVisible: boolean;
  arrowPosition: string;
  onClose: () => void;
}
