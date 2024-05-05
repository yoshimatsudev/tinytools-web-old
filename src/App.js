import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./routes";
import HomePage from "./routes/home";
import LoginPage from "./routes/login";
import LogoutPage from "./routes/logout";
import AuthsPage from "./routes/auths";
import LogsPage from "./routes/logs";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/auths" element={<AuthsPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
