export const OPERATIONS = ["Addition", "Subtraction"] as const;
export type Operation = (typeof OPERATIONS)[number];

export default function Prover() {
  return <div>Prover</div>;
}
