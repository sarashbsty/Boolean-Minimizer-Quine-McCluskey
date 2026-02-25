A Web-based tool to **simplify Boolean expressions** using the **Quine-McCluskey algorithm** and **Petrick's method**. Designed as a lightweight hobby project with an easy-to-use WEB UI.

---

## Features

- Implements **Quine-McCluskey algorithm** for exact minimization of Boolean expressions.
- Supports **Petrick’s method** for selecting minimal solutions when multiple prime implicants exist.
- **Tabulated Results Page**.
- Handles up to `n` variables (customizable).
- Step-by-step display of:
  - Grouping minterms
  - Reducing minterms
  - Prime implicants
  - Essential prime implicants
  - Column reduction
  - Petrick Algorithm process
  - Final minimized expression

## WORKINGS
- Uses a Web Assembly module that accepts json text as Input and returns JSON text as output
- https://github.com/sarashbsty/Quine-Mccluskey-Module
