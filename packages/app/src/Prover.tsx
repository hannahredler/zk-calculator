import { useState } from "react";
import { groth16 } from "snarkjs";
import { FC, useEffect } from "react";

const Prover: FC<{ first: number | null; second: number | null }> = ({
  first,
  second,
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [proof, setProof] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    setDisabled(first === null || second === null);
  }, [first, second]);

  return (
    <>
      <button
        disabled={disabled}
        className={`border border-px rounded p-2 ${
          disabled ? "pointer-events-none" : "hover:bg-green-600"
        }`}
        onClick={async () => {
          if (!first || !second) return;

          const res = await groth16.fullProve(
            { x1: first, x2: second },
            "./Addition.wasm",
            "./Addition_final.zkey"
          );

          setResult(Number(res.publicSignals[0]));
        }}
      >
        Calculate and Prove!
      </button>
      <span>Result: {result}</span>
    </>
  );
};

export default Prover;
