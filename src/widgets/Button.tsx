type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", children, className, ...props }: ButtonProps) {
  const baseStyle = 'p-2 text-amber-50 rounded-lg px-5 py-2 uppercase font-semibold cursor-pointer'
  const bgColor = variant === 'primary' ? 'bg-[#5b68b5]': 'bg-[#ab711b]'

  return (
    <button
      className={`${baseStyle} ${className} ${bgColor}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}