import { Switch, BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EditUser from "./pages/EditProduct";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/edit/:id" component={EditUser} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
