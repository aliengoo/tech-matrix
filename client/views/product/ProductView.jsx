import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import ProductStore from './ProductStore';
import ProductActions from './ProductActions';

import Form from '../_components/Form.jsx'
import ProductName from './_components/ProductName.jsx';
import ProductBusinessOwner from './_components/ProductBusinessOwner.jsx';
import ProductDependencies from './_components/ProductDependencies.jsx';
import ProductSupportNotes from './_components/ProductSupportNotes.jsx';

class ProductView extends Component {

  constructor(props) {
    super(props);
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

    ProductActions.fetchPeople();
    ProductActions.fetchProductNames();

    if (params && params.id) {
      ProductActions.fetchProduct(params.id);
    }
  }

  onChange(field) {
    ProductActions.setProductField(field);
  }

  render() {

    const {fetching, error, product, people, productNames} = this.props;

    return (
      <div className="container">
        <header className="col-lg-12">
          <h1>Product</h1>
        </header>


        <div className="col-lg-12">
          <Form name="productForm" onFormStateUpdated={ProductActions.formStateUpdated}>
            <div className="col-lg-6">

              <ProductName
                fetching={fetching}
                value={product.name}
                onChange={value => this.onChange({'name': value})}/>

              <ProductDependencies
                fetching={fetching}
                value={product.dependencies}
                productNames={productNames}
                onChange={value => this.onChange({'dependencies': value})}/>

              <ProductBusinessOwner
                fetching={fetching}
                value={product.businessOwners}
                people={people}
                onChange={value => this.onChange({'businessOwners': value})}/>
            </div>

            <div className="col-lg-6">
              <ProductSupportNotes
                value={product.supportNotes}
                fetching={fetching}
                onChange={value => this.onChange({'supportNotes': value})}/>
            </div>

          </Form>
        </div>
      </div>
    );

  }
}

export default connectToStores(ProductView);