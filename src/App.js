import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Body from "./components/layout/Body";
import { Footer } from "antd/lib/layout/layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Body />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
