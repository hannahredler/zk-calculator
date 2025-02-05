# ZK Calculator

A simple calculator that uses zkSNARKs to prove the correctness of the addition operation.

Enter two numbers, and the application will calculate the answer as well as a ZK proof of the solution, which can then be used to verify the calculation is correct.

This implementation utilises Groth-16.

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

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Git

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

### Step 3: (Optional) Update the trusted setup:

To update the trusted setup, you can run:

```bash
pnpm run setup:tau
```

You will be prompted to add text several times, to simulate the process of having multiple users contribute to the trusted setup via a shared secret.

_NB: This is not a real-world scenario, as a powers of tau ceremony requires many participants from many different machines, so as to minimize the risk of collusion. Here we simulate the ceremony for demonstration purposes only._
