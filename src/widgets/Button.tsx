type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyle =
    'p-2 text-amber-50 rounded-3xl px-5 py-2 uppercase font-semibold cursor-pointer inset-shadow-sm inset-shadow-purple-800';
  const bgColor = variant === 'primary' ? 'bg-purple-600' : '';

  return (
    <button
      className={`${baseStyle} ${className} ${bgColor} ${variant !== 'primary' ? 'outline-1 outline-indigo-300' : ''}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
