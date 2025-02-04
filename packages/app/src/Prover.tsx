import { useState } from "react";
import { groth16, Groth16Proof } from "snarkjs";
import { FC, useEffect } from "react";

const Prover: FC<{ first: number | null; second: number | null }> = ({
  first,
  second,
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [proof, setProof] = useState<Groth16Proof | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    setDisabled(first === null || second === null);
  }, [first, second]);

  return (
    <>
      <button
        disabled={disabled}
        className={`border border-px border-green-500 rounded p-2 ${
          disabled ? "pointer-events-none" : "hover:bg-green-600"
        }`}
        onClick={async () => {
          if (!first || !second) return;

          const { proof, publicSignals } = await groth16.fullProve(
            { x1: first, x2: second },
            "Addition.wasm",
            "Addition_final.zkey"
          );

          setResult(Number(publicSignals[0]));
          setProof(proof);
        }}
      >
        Calculate and Prove!
      </button>
      <span>Result: {result}</span>
      <button
        className="border border-px border-blue-500 rounded p-2"
        onClick={async () => {
          const vkey = await fetch("Addition_final.zkey.json").then(function (
            res
          ) {
            return res.json();
          });

          if (!result || !proof) return;

          const res = await groth16.verify(vkey, [String(result)], proof);
          setIsValid(res);
        }}
      >
        Verify
      </button>
      {isValid !== null && <span>Is valid: {isValid ? "Yes" : "No"}</span>}
    </>
  );
};

export default Prover;
