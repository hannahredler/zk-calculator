# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR/.."

# Find all .circom files in the circuits directory
for CIRCUIT_PATH in "$PROJECT_ROOT/circuits"/*.circom; do
    # Extract circuit name without extension
    CIRCUIT_NAME=$(basename "$CIRCUIT_PATH" .circom)
    echo "Processing circuit: $CIRCUIT_NAME"

    # Remove existing circuit folder if it exists and create it fresh
    rm -rf "$PROJECT_ROOT/build/$CIRCUIT_NAME"
    mkdir -p "$PROJECT_ROOT/build/$CIRCUIT_NAME"
    mkdir -p "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys"

    # compile circuit
    circom "$CIRCUIT_PATH" --r1cs --wasm --c --sym --inspect -o "$PROJECT_ROOT/build/$CIRCUIT_NAME"

    # view information about circuit
    snarkjs r1cs info "$PROJECT_ROOT/build/$CIRCUIT_NAME/$CIRCUIT_NAME.r1cs"

    # export circuit to json for readability
    snarkjs r1cs export json "$PROJECT_ROOT/build/$CIRCUIT_NAME/$CIRCUIT_NAME.r1cs" "$PROJECT_ROOT/build/$CIRCUIT_NAME/$CIRCUIT_NAME.r1cs.json"
    cat "$PROJECT_ROOT/build/$CIRCUIT_NAME/$CIRCUIT_NAME.r1cs.json"

    # export sample zkey - generates zkey without phase 2 contributions SHOULDNT USE IN PRODUCTION
    snarkjs groth16 setup "$PROJECT_ROOT/build/$CIRCUIT_NAME/$CIRCUIT_NAME.r1cs" "$PROJECT_ROOT/trusted-setup/my_powersOfTau_final.ptau" "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys/${CIRCUIT_NAME}_0000.zkey"

    # ceremony phase 2
    snarkjs zkey contribute "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys/${CIRCUIT_NAME}_0000.zkey" "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys/${CIRCUIT_NAME}_0001.zkey" --name="1st Contributor Name" -v
    snarkjs zkey contribute "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys/${CIRCUIT_NAME}_0001.zkey" "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys/${CIRCUIT_NAME}_0002.zkey" --name="2nd Contributor Name" -v

    # apply a random beacon
    snarkjs zkey beacon "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys/${CIRCUIT_NAME}_0002.zkey" "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys/${CIRCUIT_NAME}_final.zkey" 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

    # verify the latest zkey
    snarkjs zkey verify "$PROJECT_ROOT/build/$CIRCUIT_NAME/$CIRCUIT_NAME.r1cs" "$PROJECT_ROOT/trusted-setup/my_powersOfTau_final.ptau" "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys/${CIRCUIT_NAME}_final.zkey"

    # export zkey
    snarkjs zkey export verificationkey "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys/${CIRCUIT_NAME}_final.zkey" "$PROJECT_ROOT/build/$CIRCUIT_NAME/zkkeys/${CIRCUIT_NAME}_final.zkey.json"

    echo "Completed processing circuit: $CIRCUIT_NAME"
    echo "----------------------------------------"
done


