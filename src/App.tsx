import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Pagination from "./components/Pagination/Pagination";

function App() {
  return (
    <div className="App">
      <Pagination />
    </div>
  );
}

export default App;
