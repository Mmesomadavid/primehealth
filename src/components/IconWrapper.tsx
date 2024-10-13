import { FC } from 'react';

interface IconWrapperProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>; // React component type for SVG icons
  className?: string;
  style?: React.CSSProperties;
}

const IconWrapper: FC<IconWrapperProps> = ({ Icon, className, style }) => {
  return <Icon className={className} style={style} />;
};

export default IconWrapper;
