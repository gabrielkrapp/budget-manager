import { BrowserRouter } from "react-router-dom";
import { RouterComponent } from "./router/Router";

export const BASE_URL = "http://localhost:3001";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
