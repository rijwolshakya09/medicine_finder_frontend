import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Body from "./components/layout/Body";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Body />
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
