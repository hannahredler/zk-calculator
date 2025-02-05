import { FC } from "react";

export const VerificationStatus: FC<{ isValid: boolean | null }> = ({
  isValid,
}) => {
  return (
    <span className="text-sm">
      Status:{" "}
      <span
        className={`${
          isValid === null
            ? "text-gray-400"
            : isValid
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {isValid === null ? "Not verified" : isValid ? "Valid ✓" : "Invalid ✗"}
      </span>
    </span>
  );
};
