import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import ProductStore from './ProductStore';
import ProductActions from './ProductActions';

@connectToStores
class ProductView extends Component {

  constructor() {
    this.renderProduct = this.renderProduct.bind(this);
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  componentDidMount() {
    ProductActions.fetchProduct(1);
  }

  render() {

    let product = (<div>No product</div>);

    if (this.props.product) {
      product = this.renderProduct();
    }

    return (
      <div className="container">
        <header className="col-lg-12">
          <h1>Product</h1>
        </header>

        <div className="col-lg-12">
          {product}
        </div>
      </div>
    );
  }

  renderProduct() {
    const {product} = this.props;
    return (
      <dl>
        <dt>Name</dt>
        <dd>{product.name}</dd>
      </dl>
    );
  }
}

export default ProductView;