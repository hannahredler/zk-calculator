# compile circuit
circom --r1cs --wasm --c --sym --inspect ./circuits/Addition.circom build

# view information about circuit
snarkjs r1cs info build/Addition.r1cs

# export circuit to json for readability
snarkjs r1cs export json build/Addition.r1cs build/Addition.r1cs.json
cat build/Addition.r1cs.json

# export sample zkey - generates zkey without phase 2 contributions SHOULDNT USE IN PRODUCTION
snarkjs groth16 setup build/Addition.r1cs trusted-setup/my_powersOfTau_final.ptau zkkeys/Addition_0000.zkey

# ceremony phase 2
snarkjs zkey contribute zkkeys/Addition_0000.zkey zkkeys/Addition_0001.zkey --name="1st Contributor Name" -v
snarkjs zkey contribute zkkeys/Addition_0001.zkey zkkeys/Addition_0002.zkey --name="2nd Contributor Name" -v

# apply a random beacon
snarkjs zkey beacon zkkeys/Addition_0002.zkey zkkeys/Addition_final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

# verify the latest zkey
snarkjs zkey verify build/Addition.r1cs trusted-setup/my_powersOfTau_final.ptau zkkeys/Addition_final.zkey

# export zkey
snarkjs zkey export verificationkey zkkeys/Addition_final.zkey zkkeys/Addition_final.zkey.json


