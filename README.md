# ZK Calculator!

A simple calculator that uses zkSNARKs to prove the correctness of the addition operation.

## Technologies

Monorepo:

- pnpm & pnpm workspaces

Front end:

- Typescript
- React
- Vite
- Tailwind

Circuits:

- Circom
- Snarkjs
- Groth16
- Powers of Tau

## Setup

### Step 0: Clone repository

```bash
git clone https://github.com/hannahredler/zk-calculator.git
```

### Step 1: Install dependencies

From the root of the repository, run:

```bash
pnpm install
```

This will install all dependencies for the monorepo.

### Step 2: Run the app

From the root of the repository, run:

```bash
pnpm run dev
```

This will load the app in your browser. You can now use the app to add two numbers together and prove the correctness of the operation using zkSNARKs.

### (Optional) Update the trusted setup:

To update the trusted setup, you can run:

```bash
pnpm run setup:tau
```

You will be prompted to add text several times, to simulate the process of having multiple users contribute to the trusted setup via a shared secret.

NB: This is not a real-world scenario, as a powers of tau ceremony requires many participants from many different machines, so as to minimize the risk of collusion. Here we simulate the ceremony for demonstration purposes only.
