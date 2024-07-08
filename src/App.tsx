import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { fetchTransactions } from "./features/dashboard/redux/transactionActions";
import Dashboard from "./features/dashboard/Dashboard";
import { useAppDispatch } from "./store/hooks";
import Summary from "./features/summary/Summary";
import { Flex, Spinner } from "@chakra-ui/react";

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTransactions()).then(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

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
