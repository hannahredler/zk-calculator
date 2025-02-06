import { PlusIcon, MinusIcon } from "@heroicons/react/16/solid";

import { Operation } from "@app/lib/proof";
import { FC } from "react";

export const OperatorDisplay: FC<{ operation: Operation }> = ({
  operation,
}) => {
  const className = "h-5 w-5";

  return (
    <div className="flex flex-col items-center justify-end">
      {operation === "Addition" && <PlusIcon className={className} />}
      {operation === "Subtraction" && <MinusIcon className={className} />}
    </div>
  );
};
