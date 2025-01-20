pragma circom 2.0.0;


template Addition() {

    signal input x1;
    signal input x2;

    signal output out;

    out <== x1 + x2;
}


component main = Addition();