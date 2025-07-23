export default function PrimaryButton({ children, as = "button", className = "", ...rest }) {
  const Comp = as;
  return (
    <Comp
      className={`rounded-lg bg-primary px-5 py-2 text-white transition hover:bg-secondary ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  );
}
