const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

// Mock transaction data
let transactions = [
  {
    id: 1,
    description: "Salary",
    amount: 5000,
    type: "income",
    category: "Job",
    date: "2024-06-01",
  },
  {
    id: 2,
    description: "Groceries",
    amount: 150,
    type: "expense",
    category: "Food",
    date: "2024-06-02",
  },
  {
    id: 3,
    description: "Electricity Bill",
    amount: 75,
    type: "expense",
    category: "Utilities",
    date: "2024-06-05",
  },
  {
    id: 4,
    description: "Gym Membership",
    amount: 40,
    type: "expense",
    category: "Health",
    date: "2024-06-07",
  },
  {
    id: 5,
    description: "Book Purchase",
    amount: 20,
    type: "expense",
    category: "Education",
    date: "2024-06-10",
  },
  {
    id: 6,
    description: "Freelance Project",
    amount: 800,
    type: "income",
    category: "Job",
    date: "2024-06-15",
  },
  {
    id: 7,
    description: "Dinner Out",
    amount: 60,
    type: "expense",
    category: "Food",
    date: "2024-06-20",
  },
];

let last_id = 7;

// CRUD Operations

// Create a new transaction
app.post("/transactions", (req, res) => {
  const newTransaction = {
    id: ++last_id,
    date: new Date().toISOString(),
    ...req.body,
  };
  transactions.push(newTransaction);
  res.status(201).send(newTransaction);
});

// Read all transactions
app.get("/transactions", (req, res) => {
  res.status(200).send(transactions);
});

// Read a single transaction by id
app.get("/transactions/:id", (req, res) => {
  const transaction = transactions.find(
    (t) => t.id === parseInt(req.params.id)
  );
  if (!transaction) return res.status(404).send("Transaction not found");
  res.status(200).send(transaction);
});

// Update a transaction by id
app.put("/transactions/:id", (req, res) => {
  const transaction = transactions.find(
    (t) => t.id === parseInt(req.params.id)
  );
  if (!transaction) return res.status(404).send("Transaction not found");

  transaction.description = req.body.description;
  transaction.amount = req.body.amount;
  transaction.type = req.body.type;
  transaction.category = req.body.category;
  transaction.date = new Date().toISOString();

  res.status(200).send(transaction);
});

// Delete a transaction by id
app.delete("/transactions/:id", (req, res) => {
  const transactionIndex = transactions.findIndex(
    (t) => t.id === parseInt(req.params.id)
  );
  if (transactionIndex === -1)
    return res.status(404).send("Transaction not found");

  transactions.splice(transactionIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
