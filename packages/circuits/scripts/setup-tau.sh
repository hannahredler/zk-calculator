# Check if trusted-setup directory exists
if [ -d "./trusted-setup" ]; then
    # Directory exists, clean its contents
    rm -rf ./trusted-setup/*
else
    # Directory doesn't exist, create it
    mkdir -p ./trusted-setup
fi

# start a new ceremony
snarkjs powersoftau new bn128 12 ./trusted-setup/my_powersOfTau.ptau

# contribute to the ceremony
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau.ptau ./trusted-setup/my_powersOfTau_1.ptau --name="First Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_1.ptau ./trusted-setup/my_powersOfTau_2.ptau --name="Second Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_2.ptau ./trusted-setup/my_powersOfTau_3.ptau --name="Third Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_3.ptau ./trusted-setup/my_powersOfTau_4.ptau --name="Fourth Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_4.ptau ./trusted-setup/my_powersOfTau_5.ptau --name="Fifth Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_5.ptau ./trusted-setup/my_powersOfTau_6.ptau --name="Sixth Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_6.ptau ./trusted-setup/my_powersOfTau_7.ptau --name="Seventh Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_7.ptau ./trusted-setup/my_powersOfTau_8.ptau --name="Eighth Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_8.ptau ./trusted-setup/my_powersOfTau_9.ptau --name="Ninth Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_9.ptau ./trusted-setup/my_powersOfTau_10.ptau --name="Tenth Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_10.ptau ./trusted-setup/my_powersOfTau_11.ptau --name="Eleventh Contributor"
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_11.ptau ./trusted-setup/my_powersOfTau_12.ptau --name="Twelfth Contributor"

# Apply a random beacon (normally something can't be known ahead of time) (see here for more: https://github.com/iden3/snarkjs?tab=readme-ov-file#6-apply-a-random-beacon)
snarkjs powersoftau beacon ./trusted-setup/my_powersOfTau_12.ptau ./trusted-setup/my_powersOfTau_beacon.ptau 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon"

# verify the ceremony
snarkjs powersoftau verify ./trusted-setup/my_powersOfTau_beacon.ptau

# prepare phase 2 of the ceremony
snarkjs powersoftau prepare phase2 ./trusted-setup/my_powersOfTau_beacon.ptau ./trusted-setup/my_powersOfTau_final.ptau -v

# verify final output
snarkjs powersoftau verify ./trusted-setup/my_powersOfTau_final.ptau