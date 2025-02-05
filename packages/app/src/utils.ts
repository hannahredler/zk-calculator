import { groth16 } from "snarkjs";

export const proveAddition = async (a: number, b: number) => {
  const { proof, publicSignals } = await groth16.fullProve(
    { x1: a, x2: b },
    "Addition.wasm",
    "Addition_final.zkey"
  );

  return [publicSignals[0], proof];
};

export const truncate = (str: string) => {
  return str.slice(0, 3) + "..." + str.slice(-3);
};
