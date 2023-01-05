import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Body from "./components/layout/Body";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Body />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
