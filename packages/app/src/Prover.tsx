import { useState } from "react";
import { groth16, Groth16Proof } from "snarkjs";
import { FC, useEffect } from "react";

const Prover: FC<{ first: number | null; second: number | null }> = ({
  first,
  second,
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isProving, setIsProving] = useState<boolean>(false);
  const [proof, setProof] = useState<Groth16Proof | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    setDisabled(first === null || second === null);
  }, [first, second]);

  return (
    <div className="flex flex-col gap-2 items-start">
      <button
        disabled={disabled}
        className={`border border-px border-primary  text-primary rounded p-2 ${
          disabled
            ? "pointer-events-none"
            : "hover:bg-primary hover:text-background hover:shadow-[0_0_10px_primary]"
        }`}
        onClick={async () => {
          if (!first || !second) return;

          setIsProving(true);
          const { proof, publicSignals } = await groth16.fullProve(
            { x1: first, x2: second },
            "Addition.wasm",
            "Addition_final.zkey"
          );

          setResult(Number(publicSignals[0]));
          setProof(proof);
          setIsProving(false);
        }}
      >
        Calculate and Prove!
      </button>
      {isProving && <span>Proving...</span>}
      {result && (
        <>
          <span>Result: {result}</span>
          <button
            className="border border-px border-secondary rounded p-2 hover:bg-secondary hover:text-background hover:shadow-[0_0_10px_secondary]"
            onClick={async () => {
              const vkey = await fetch("Addition_final.zkey.json").then(
                function (res) {
                  return res.json();
                }
              );

              if (!result || !proof) return;

              const res = await groth16.verify(vkey, [String(result)], proof);
              setIsValid(res);
            }}
          >
            Verify
          </button>
          {isValid !== null && <span>Is valid: {isValid ? "Yes" : "No"}</span>}
        </>
      )}
    </div>
  );
};

export default Prover;
