import {Router, Route} from 'react-router';
import ProductView from './views/product/ProductView.jsx';

let routes = (
  <Router>
    <Route path="/product" component={ProductView}/>
  </Router>
);

export default routes;
