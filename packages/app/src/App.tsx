import { useState, useEffect } from "react";
import { PlusCircleIcon, EqualsIcon } from "@heroicons/react/16/solid";
import { NumberInput } from "./components/NumberInput";
import { groth16, Groth16Proof } from "snarkjs";
import PrimaryButton from "./components/PrimaryButton";
import { proveAddition } from "./utils";

function App() {
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [proof, setProof] = useState<Groth16Proof | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const verify = async (result: number | null, proof: Groth16Proof | null) => {
    if (!result || !proof) return;

    const vkey = await fetch("Addition_final.zkey.json").then((res) =>
      res.json()
    );
    const isValid = await groth16.verify(vkey, [String(result)], proof);
    setIsValid(isValid);
  };

  const prove = async (first: number | null, second: number | null) => {
    if (!first || !second) {
      setResult(null);
      setProof(null);
      return;
    }
    let [res, proof] = await proveAddition(first, second);
    setResult(Number(res));
    setProof(proof as Groth16Proof);
  };

  useEffect(() => {
    prove(first, second);
  }, [first, second]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center bg-background text-white">
        <div className="flex flex-col items-start justify-center my-20 p-5">
          <h1 className="font-semibold text-2xl mb-10">
            ZK Powered Verifiable Calculator
          </h1>

          <div className="flex flex-row gap-2 mb-5 items-center">
            <NumberInput label="First value" setValue={setFirst} />
            <div className="flex flex-col items-center justify-end">
              <PlusCircleIcon className="h-5 w-5" />
            </div>
            <NumberInput label="Second value" setValue={setSecond} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <EqualsIcon className="h-5 w-5" />
              <span>{result}</span>
            </div>

            {result && (
              <>
                <div className="flex flex-row gap-2">
                  <PrimaryButton onClick={() => verify(result, proof)}>
                    Verify
                  </PrimaryButton>
                </div>

                <div className="flex flex-row">
                  {isValid !== null && (
                    <span>
                      Is valid:{" "}
                      <span className="text-accent">
                        {isValid ? "Yes" : "No"}
                      </span>
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
