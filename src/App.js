import Header from "./Components/Header/Header";
import BurgerBuilder from "./Components/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <BurgerBuilder />
      </div>
    </div>
  );
}

export default App;
