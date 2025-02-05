import { FC, PropsWithChildren } from "react";

const PrimaryButton: FC<
  PropsWithChildren<{ onClick: () => void; disabled?: boolean }>
> = ({ onClick, children, disabled }) => {
  return (
    <button
      className={`border rounded h-5 flex flex-row items-center p-2 py-3 ${
        disabled
          ? "border-gray-400 text-gray-400 opacity-50 pointer-events-none"
          : "border-primary text-primary hover:shadow-primary"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
