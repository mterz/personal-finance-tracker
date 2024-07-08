import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { fetchTransactions } from "./features/dashboard/transactionActions";
import Dashboard from "./features/dashboard/Dashboard";
import { useAppDispatch } from "./store/hooks";
import Summary from "./features/summary/Summary";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="summary" element={<Summary />} />
      </Route>
    </Routes>
  );
}

export default App;
