import { RecoilRoot } from "recoil";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <RecoilRoot>
      <Header />
      <Main />
      <Footer />
    </RecoilRoot>
  );
}

export default App;
