pragma circom 2.0.0;


template Subtraction() {

    signal input x1;
    signal input x2;

    signal output sign;
    signal output num;

    out <== x1 - x2;
}


component main = Subtraction();