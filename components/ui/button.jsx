const variants = {
  default: "ui-button-default",
  outline: "ui-button-outline",
  ghost: "ui-button-ghost",
};
const sizes = {
  default: "ui-button-size-default",
  sm: "ui-button-size-sm",
  lg: "ui-button-size-lg",
  icon: "ui-button-size-icon",
};

/** Small shadcn-compatible Button primitive used by LunaPath controls. */
export function Button({
  variant = "default",
  size = "default",
  className = "",
  type = "button",
  ...props
}) {
  const variantClass = variants[variant] ?? variants.default;
  const sizeClass = sizes[size] ?? sizes.default;

  return (
    <button
      type={type}
      className={["ui-button", variantClass, sizeClass, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
