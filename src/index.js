import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './style/index.css';
// import * as serviceWorker from './serviceWorker';
import Login from './components/login/Login';
import Register from './components/login/Register';
import CarTable from './components/car/CarTable';
import CarList from './components/car/CarList';


ReactDOM.render(
    <Router>
        <div>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/car_table" component={CarTable} />
            <Route path="/car" component={CarList} />
        </div>
    </Router>,
    document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    //?????
    // serviceWorker.unregister();
