import { RecoilRoot } from "recoil";
import Footer from "./components/main/Footer";
import Header from "./components/main/Header";
import Main from "./components/main/Main";

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
