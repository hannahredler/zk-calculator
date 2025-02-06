import { groth16, Groth16Proof } from "snarkjs";

export const OPERATIONS = ["Addition", "Subtraction"] as const;
export type Operation = (typeof OPERATIONS)[number];

const FIELD_SIZE = BigInt(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617"
);

export const prove = async (
  a: number,
  b: number,
  operation: Operation
): Promise<[bigint, Groth16Proof]> => {
  const { proof, publicSignals } = await groth16.fullProve(
    { x1: a, x2: b },
    `${operation}.wasm`,
    `${operation}_final.zkey`
  );

  let val = BigInt(publicSignals[0]);

  if (val > FIELD_SIZE / 2n) {
    return [val - FIELD_SIZE, proof];
  } else {
    return [val, proof];
  }
};

export const verify = async (
  operation: Operation,
  result: bigint,
  proof: Groth16Proof
) => {
  const vkey = await fetch(`${operation}_final.zkey.json`).then((res) =>
    res.json()
  );
  return await groth16.verify(vkey, [String(result)], proof);
};
