import { FC, useEffect, useState } from "react";
import { Groth16Proof } from "snarkjs";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { truncate } from "../lib/string";

export const ProofDisplay: FC<{ proof: Groth16Proof | null }> = ({ proof }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    proof === null && setIsOpen(false);
  }, [proof]);

  return (
    proof && (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-row items-center gap-2 hover:text-accent transition-colors text-sm "
        >
          Proof
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 text-sm  ${
            isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col text-gray-300 ml-3">
            <span>Curve: {proof?.curve}</span>
            <span>Protocol: {proof?.protocol}</span>
            <span>
              π<sub>A</sub>: [{truncate(proof.pi_a[0])},{" "}
              {truncate(proof.pi_a[1])}]
            </span>
            <span>
              π<sub>B</sub>: [[{truncate(proof.pi_b[0][0])},
              {truncate(proof.pi_b[0][1])}], [{truncate(proof.pi_b[1][0])},{" "}
              {truncate(proof.pi_b[1][1])}], [{proof.pi_b[2][0]},
              {proof.pi_b[2][1]}]]
            </span>
            <span>
              π<sub>C</sub>: [{truncate(proof.pi_c[0])},{" "}
              {truncate(proof.pi_c[1])}]
            </span>
          </div>
        </div>
      </div>
    )
  );
};
