import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from './logo.png'
import Counter from './components/Counter'
import Tariff from './components/Tariff'
import Home from './components/Home'
import Chart from './components/Chart'

function App() {
  const initResult = {
    total: 0,
    electricity: 0,
    gaz: 0,
    water: 0,
    heat: 0,
    utilities: 0,
    intercom: 0
  };
  const initData = {
    electricity: 0,
    gaz: 0,
    water: 0,
    heat: 0,
    utilities: 0,
    intercom: 0
  };

  const owner = 'Oleksii Fedorenko <alavir.web.dev@gmail.com>';

  const [result, setResult] = useState(initResult);
  const [data, setData] = useState(initData);

  const updateResult = (value) => {
    setResult(value)
  }

  useEffect(() => {
  }, [result, data])

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand">
          <a href="/" className="navbar-brand">
            <img src={Logo} alt="logo" className="logo"/>
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/counter"} className="nav-link">
                Расчет
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/tariff"} className="nav-link">
                Тариф
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/chart"} className="nav-link">
                Статистика
              </Link>
            </li>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/counter"
                 render={(props) => <Counter {...props} setData={setData} updateResult={updateResult} result={result}
                                             data={data}/>}/>
          <Route path="/tariff" render={(props) => <Tariff {...props} setData={setData} updateResult={updateResult}/>}/>
          <Route path="/chart" render={(props) => <Chart {...props} result={result}/>}/>
        </Switch>
        <footer>
          <div className="footer-copyright py-1">
            &copy;{new Date().getFullYear()} Copyright: {owner}
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
