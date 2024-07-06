import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  selectTransactions,
  fetchTransactions,
} from "./features/dashboard/transactionsSlice";
import Dashboard from "./features/dashboard/Dashboard";
import Layout from "./components/Layout";

function App() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  console.log(transactions);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="summary" element={<div>Summary</div>} />
      </Route>
    </Routes>
  );
}

export default App;
