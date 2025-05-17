import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export const Container = ({
  children,
  className = '',
  as: Component = 'div',
  id,
}: ContainerProps) => {
  return (
    <Component id={id} className={`container mx-auto px-4 md:px-6 ${className}`}>
      {children}
    </Component>
  );
};

export default Container;