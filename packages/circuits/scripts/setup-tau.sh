# Check if trusted-setup directory exists
if [ -d "./trusted-setup" ]; then
    # Directory exists, clean its contents
    rm -rf ./trusted-setup/*
else
    # Directory doesn't exist, create it
    mkdir -p ./trusted-setup
fi

snarkjs powersoftau new bn128 12 ./trusted-setup/my_powersOfTau.ptau
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
snarkjs powersoftau contribute ./trusted-setup/my_powersOfTau_12.ptau ./trusted-setup/my_powersOfTau_final.ptau --name="Final Contributor"
snarkjs powersoftau verify ./trusted-setup/my_powersOfTau_final.ptau


