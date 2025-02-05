import { groth16, Groth16Proof } from "snarkjs";

export const proveAddition = async (
  a: number,
  b: number
): Promise<[number, Groth16Proof]> => {
  const { proof, publicSignals } = await groth16.fullProve(
    { x1: a, x2: b },
    "Addition.wasm",
    "Addition_final.zkey"
  );

  return [Number(publicSignals[0]), proof];
};

export const verifyAddition = async (result: number, proof: Groth16Proof) => {
  const vkey = await fetch("Addition_final.zkey.json").then((res) =>
    res.json()
  );
  return await groth16.verify(vkey, [String(result)], proof);
};
