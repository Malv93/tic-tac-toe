import Game from "./components/game";
import "./App.css";
import Header from "./layout/header";
import Footer from "./layout/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
