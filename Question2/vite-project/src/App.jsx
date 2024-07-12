import  { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

const App = () => {
    const [products, setProducts] = useState([]);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <ProductList setProducts={setProducts} />
                </Route>
                <Route path="/product/:id">
                    <ProductDetail products={products} />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
