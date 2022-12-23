import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Body from "./components/layout/Body";
import Header from "./components/layout/Header";
import { Footer } from "antd/lib/layout/layout";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Body />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
