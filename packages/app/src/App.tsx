import { useState, useEffect, FC } from "react";
import { PlusIcon, MinusIcon, EqualsIcon } from "@heroicons/react/16/solid";
import { NumberInput } from "./components/NumberInput";
import { Groth16Proof } from "snarkjs";
import PrimaryButton from "./components/PrimaryButton";
import { prove, verify } from "./lib/proof";
import { ProofDisplay } from "./components/ProofDisplay";
import { VerificationStatus } from "./components/VerificationStatus";
import { Operation, OPERATIONS } from "./Prover";
import clsx from "clsx";

const OperatorDisplay: FC<{ operation: Operation }> = ({ operation }) => {
  const className = "h-5 w-5";

  return (
    <div className="flex flex-col items-center justify-end">
      {operation === "Addition" && <PlusIcon className={className} />}
      {operation === "Subtraction" && <MinusIcon className={className} />}
    </div>
  );
};

function App() {
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [proof, setProof] = useState<Groth16Proof | null>(null);
  const [result, setResult] = useState<bigint | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const [selectedOperation, setSelectedOperation] =
    useState<Operation>("Addition");

  useEffect(() => {
    const handler = setTimeout(() => {
      setIsValid(null);
      if (!first || !second) {
        setResult(null);
        setProof(null);
        return;
      }
      prove(first, second, selectedOperation).then(([res, proof]) => {
        setResult(res);
        setProof(proof);
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [first, second, selectedOperation]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center bg-background text-white">
        <div className="flex flex-col items-start justify-center my-20 p-5 w-full max-w-2xl mx-auto">
          <h1 className="font-semibold text-2xl mb-10">
            ZK Powered Verifiable Calculator
          </h1>
          <h2 className="text-xs mb-2">Select an operation</h2>
          <div className="flex flex-row gap-3 mb-6 items-center text-sm">
            {OPERATIONS.map((operation) => (
              <button
                key={operation}
                className={clsx(
                  "border border-white rounded p-1",
                  operation === selectedOperation && "bg-white text-black"
                )}
                onClick={() => setSelectedOperation(operation)}
              >
                {operation}
              </button>
            ))}
          </div>

          <h2 className="text-xs mb-2">Calculate</h2>
          <div className="flex flex-row gap-2 mb-5 items-center">
            <NumberInput label="First value" setValue={setFirst} />
            <OperatorDisplay operation={selectedOperation} />
            <NumberInput label="Second value" setValue={setSecond} />

            <EqualsIcon className="h-5 w-5 text-primary" />
            <span className="text-primary">{result?.toString()}</span>
          </div>

          <div className="flex flex-row items-start justify-start gap-3 mb-5">
            <ProofDisplay proof={proof} />
          </div>

          {result !== null && (
            <>
              <h2 className="text-xs mb-2">Verification</h2>
              <div className="flex flex-row items-center gap-4">
                <PrimaryButton
                  onClick={async () => {
                    const isValid = await verify(
                      selectedOperation,
                      result!,
                      proof!
                    );
                    setIsValid(isValid);
                  }}
                  disabled={result === null || !proof}
                >
                  Verify
                </PrimaryButton>
                <VerificationStatus isValid={isValid} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
