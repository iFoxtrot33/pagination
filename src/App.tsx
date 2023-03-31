import "./App.css";
import Pagination from "./components/Pagination/Pagination";

function App() {
  return (
    <div className="App">
      <Pagination
        API_URL={"https://jsonplaceholder.typicode.com/photos?_limit=10&_page="}
        TOTAL_COUNT_HEADER={"x-total-count"}
        dynamic={true}
      />
    </div>
  );
}

export default App;
