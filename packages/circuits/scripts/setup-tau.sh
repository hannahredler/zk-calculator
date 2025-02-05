# Define the circuits directory path
CIRCUITS_DIR="$(dirname "$(dirname "$0")")"
TRUSTED_SETUP_DIR="$CIRCUITS_DIR/trusted-setup"

# Check if trusted-setup directory exists in circuits folder
if [ -d "$TRUSTED_SETUP_DIR" ]; then
    # Directory exists, clean its contents
    rm -rf "$TRUSTED_SETUP_DIR"/*
else
    # Directory doesn't exist, create it
    mkdir -p "$TRUSTED_SETUP_DIR"
fi

# start a new ceremony
snarkjs powersoftau new bn128 12 "$TRUSTED_SETUP_DIR/my_powersOfTau.ptau"

# contribute to the ceremony
snarkjs powersoftau contribute "$TRUSTED_SETUP_DIR/my_powersOfTau.ptau" "$TRUSTED_SETUP_DIR/my_powersOfTau_1.ptau" --name="First Contributor"
snarkjs powersoftau contribute "$TRUSTED_SETUP_DIR/my_powersOfTau_1.ptau" "$TRUSTED_SETUP_DIR/my_powersOfTau_2.ptau" --name="Second Contributor"
snarkjs powersoftau contribute "$TRUSTED_SETUP_DIR/my_powersOfTau_2.ptau" "$TRUSTED_SETUP_DIR/my_powersOfTau_3.ptau" --name="Third Contributor"
snarkjs powersoftau contribute "$TRUSTED_SETUP_DIR/my_powersOfTau_3.ptau" "$TRUSTED_SETUP_DIR/my_powersOfTau_4.ptau" --name="Fourth Contributor"
snarkjs powersoftau contribute "$TRUSTED_SETUP_DIR/my_powersOfTau_4.ptau" "$TRUSTED_SETUP_DIR/my_powersOfTau_5.ptau" --name="Fifth Contributor"

# Apply a random beacon
snarkjs powersoftau beacon "$TRUSTED_SETUP_DIR/my_powersOfTau_5.ptau" "$TRUSTED_SETUP_DIR/my_powersOfTau_beacon.ptau" 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon"

# verify the ceremony
snarkjs powersoftau verify "$TRUSTED_SETUP_DIR/my_powersOfTau_beacon.ptau"

# prepare phase 2 of the ceremony
snarkjs powersoftau prepare phase2 "$TRUSTED_SETUP_DIR/my_powersOfTau_beacon.ptau" "$TRUSTED_SETUP_DIR/my_powersOfTau_final.ptau" -v

# verify final output
snarkjs powersoftau verify "$TRUSTED_SETUP_DIR/my_powersOfTau_final.ptau"