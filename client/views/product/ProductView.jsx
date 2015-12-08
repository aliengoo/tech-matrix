import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import ProductStore from './ProductStore';
import ProductActions from './ProductActions';

import Name from '../_components/Name.jsx';

class ProductView extends Component {

  constructor(props) {
    super(props);
    this.renderProduct = this.renderProduct.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  componentDidMount() {
    const {params} = this.props;

    if (params && params.id) {
      ProductActions.fetchProduct(params.id);
    }
  }

  onChange(prop, target) {
    ProductActions.setProductField(prop, target.value);
    ProductActions.validateProductForm(target);
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
      <form name="productForm">
        <Name value={product.name} onChange={(target) => this.onChange('name', target)}/>
      </form>
    );
  }
}

export default connectToStores(ProductView);