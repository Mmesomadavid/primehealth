
type dataProp = {
  type: "small" | "medium" | "big";
  label: string;
  color: "blue" | "red" | "green" | "gray"; // Add any other colors you want to support
  disabled?: boolean;
  form?: boolean;
};

const Btn = ({ type, label, color, disabled, form }: dataProp) => {
  const sizeClasses = type === "big" ? "py-3 px-6 text-lg" : type === "medium" ? "py-2 px-4 text-md" : "py-1 px-2 text-sm";
  const colorClasses =
    color === "blue"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : color === "red"
      ? "bg-red-500 text-white hover:bg-red-600"
      : color === "green"
      ? "bg-green-500 text-white hover:bg-green-600"
      : "bg-gray-500 text-white hover:bg-gray-600";

  return (
    <button
      type={form ? "submit" : "button"}
      disabled={disabled}
      className={`rounded ${sizeClasses} ${colorClasses} focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out w-full ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {label}
    </button>
  );
};

export default Btn;
