# calculate witness for a specific input
snarkjs wtns calculate build/Addition_js/Addition.wasm run/input.json run/witness.wtns

# generate proof
snarkjs groth16 prove zkkeys/Addition_final.zkey run/witness.wtns run/proof.json run/public.json

# verify proof
snarkjs groth16 verify zkkeys/Addition_final.zkey.json run/public.json run/proof.json

