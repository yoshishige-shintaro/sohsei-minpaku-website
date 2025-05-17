import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  isExternal?: boolean;
}

// ボタンの基本スタイル
const baseStyles = 'font-medium rounded-md transition-all duration-300 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2';

// バリアントに基づくスタイル
const variantStyles = {
  primary: 'bg-deep-blue text-white hover:bg-opacity-90 focus:ring-deep-blue',
  secondary: 'bg-white text-deep-blue border border-deep-blue hover:bg-deep-blue hover:text-white focus:ring-deep-blue',
  accent: 'bg-wakatake text-white hover:bg-opacity-90 focus:ring-wakatake',
  outline: 'bg-transparent text-deep-blue border border-deep-blue hover:bg-deep-blue hover:text-white focus:ring-deep-blue',
};

// サイズに基づくスタイル
const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

// 通常のボタン
export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// リンクとして機能するボタン
export const LinkButton = ({
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  href,
  children,
  isExternal = false,
  ...props
}: LinkButtonProps) => {
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`;
  
  if (isExternal) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link href={href} className={buttonClasses} {...props}>
      {children}
    </Link>
  );
};