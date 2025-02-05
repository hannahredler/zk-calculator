# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR/.."

# compile circuit
circom --r1cs --wasm --c --sym --inspect "$PROJECT_ROOT/circuits/Addition.circom" "$PROJECT_ROOT/build"

# view information about circuit
snarkjs r1cs info "$PROJECT_ROOT/build/Addition.r1cs"

# export circuit to json for readability
snarkjs r1cs export json "$PROJECT_ROOT/build/Addition.r1cs" "$PROJECT_ROOT/build/Addition.r1cs.json"
cat "$PROJECT_ROOT/build/Addition.r1cs.json"

# export sample zkey - generates zkey without phase 2 contributions SHOULDNT USE IN PRODUCTION
snarkjs groth16 setup "$PROJECT_ROOT/build/Addition.r1cs" "$PROJECT_ROOT/trusted-setup/my_powersOfTau_final.ptau" "$PROJECT_ROOT/zkkeys/Addition_0000.zkey"

# ceremony phase 2
snarkjs zkey contribute "$PROJECT_ROOT/zkkeys/Addition_0000.zkey" "$PROJECT_ROOT/zkkeys/Addition_0001.zkey" --name="1st Contributor Name" -v
snarkjs zkey contribute "$PROJECT_ROOT/zkkeys/Addition_0001.zkey" "$PROJECT_ROOT/zkkeys/Addition_0002.zkey" --name="2nd Contributor Name" -v

# apply a random beacon
snarkjs zkey beacon "$PROJECT_ROOT/zkkeys/Addition_0002.zkey" "$PROJECT_ROOT/zkkeys/Addition_final.zkey" 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

# verify the latest zkey
snarkjs zkey verify "$PROJECT_ROOT/build/Addition.r1cs" "$PROJECT_ROOT/trusted-setup/my_powersOfTau_final.ptau" "$PROJECT_ROOT/zkkeys/Addition_final.zkey"

# export zkey
snarkjs zkey export verificationkey "$PROJECT_ROOT/zkkeys/Addition_final.zkey" "$PROJECT_ROOT/zkkeys/Addition_final.zkey.json"


