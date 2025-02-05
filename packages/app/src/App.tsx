import { useState, useEffect, FC } from "react";
import { PlusIcon, EqualsIcon } from "@heroicons/react/16/solid";
import { NumberInput } from "./components/NumberInput";
import { Groth16Proof } from "snarkjs";
import PrimaryButton from "./components/PrimaryButton";
import { proveAddition, verifyAddition } from "./lib/proof";
import { ProofDisplay } from "./components/ProofDisplay";
import { VerificationStatus } from "./components/VerificationStatus";

function App() {
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [proof, setProof] = useState<Groth16Proof | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const verify = async (result: number | null, proof: Groth16Proof | null) => {
    if (!result || !proof) return;

    const isValid = await verifyAddition(result, proof);
    setIsValid(isValid);
  };

  const prove = async (first: number | null, second: number | null) => {
    if (!first || !second) {
      setResult(null);
      setProof(null);
      return;
    }
    let [res, proof] = await proveAddition(first, second);
    setResult(res);
    setProof(proof);
  };

  useEffect(() => {
    setIsValid(null);
    prove(first, second);
  }, [first, second]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center bg-background text-white">
        <div className="flex flex-col items-start justify-center my-20 p-5 w-1/3">
          <h1 className="font-semibold text-2xl mb-10">
            ZK Powered Verifiable Calculator
          </h1>

          <div className="flex flex-row gap-2 mb-5 items-center">
            <NumberInput label="First value" setValue={setFirst} />
            <div className="flex flex-col items-center justify-end">
              <PlusIcon className="h-5 w-5" />
            </div>
            <NumberInput label="Second value" setValue={setSecond} />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-start justify-start gap-3 mb-5">
              <div className="flex flex-row items-center gap-2 text-primary h-6">
                <EqualsIcon className="h-5 w-5" />
                <span className="">{result}</span>
              </div>
              <ProofDisplay proof={proof} />
            </div>

            <div className="flex flex-row items-center gap-4">
              <PrimaryButton
                onClick={() => verify(result!, proof!)}
                disabled={!result || !proof}
              >
                Verify
              </PrimaryButton>
              <VerificationStatus isValid={isValid} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
