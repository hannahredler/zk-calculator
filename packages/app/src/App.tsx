import { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { NumberInput } from "./NumberInput";
import Prover from "./Prover";

function App() {
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center">
        <h1 className="my-5 font-semibold text-2xl">
          ZK Powered Verifiable Calculator
        </h1>
        <div className="flex flex-row gap-2 mb-5">
          <NumberInput label="First value" setValue={setFirst} />
          <div className="flex flex-col items-center justify-end">
            <PlusCircleIcon className="h-5 w-5" />
          </div>
          <NumberInput label="Second value" setValue={setSecond} />
        </div>
        <Prover first={first} second={second} />
      </div>
    </>
  );
}

export default App;
