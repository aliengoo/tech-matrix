import connectToStores from 'alt/utils/connectToStores';
import React, {Component, PropTypes} from 'react';
import AppStore from '../AppStore';
import AppActions from '../AppActions';
import ProductStore from './ProductStore';
import ProductActions from './ProductActions';

import Form from '../_components/Form.jsx'
import ProductName from './_components/ProductName.jsx';
import ProductBusinessOwners from './_components/ProductBusinessOwners.jsx';
import ProductTechnologyOwners from './_components/ProductTechnologyOwners.jsx';
import ProductRelatedProducts from './_components/ProductRelatedProducts.jsx';
import ProductNotes from './_components/ProductNotes.jsx';
import ProductMaintenanceEndDate from './_components/ProductMaintenanceEndDate.jsx';
import ProductMaintenanceNotes from './_components/ProductMaintenanceNotes.jsx';
import ProductSupportEndDate from './_components/ProductSupportEndDate.jsx';
import ProductSupportNotes from './_components/ProductSupportNotes.jsx';

class ProductView extends Component {

  constructor(props) {
    super(props);
    this.setField = this.setField.bind(this);
  }

  static getStores() {
    return [AppStore, ProductStore];
  }

  static getPropsFromStores() {

    var props = Object.assign(
      {},
      ProductStore.getState(),
      AppStore.getState());
    return props;
  }

  componentDidMount() {
    const {params} = this.props;

    if (params && params.id) {
      ProductActions.get(params.id);
    }
  }

  setField(field) {
    ProductActions.setField(field);
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
                onChange={value => this.setField({'name': value})}/>

              <ProductRelatedProducts
                fetching={fetching}
                value={product.relatedProducts}
                options={productNames}
                onChange={value => this.setField({'relatedProducts': value})}/>

              <ProductTechnologyOwners
                fetching={fetching}
                value={product.technologyOwners}
                options={people}
                onChange={value => this.setField({'technologyOwners': value})}/>

              <ProductBusinessOwners
                fetching={fetching}
                value={product.businessOwners}
                options={people}
                onChange={value => this.setField({'businessOwners': value})}/>

              <ProductNotes
                fetching={fetching}
                value={product.notes}
                onChange={value => this.setField({'notes': value})}/>
            </div>

            <div className="col-lg-6">
              <ProductMaintenanceEndDate
                value={product.maintenanceEndDate}
                fetching={fetching}
                onChange={value => this.setField({'maintenanceEndDate': value})}
              />

              <ProductMaintenanceNotes
                value={product.maintenanceNotes}
                fetching={fetching}
                onChange={value => this.setField({'maintenanceNotes': value})}/>

              <ProductSupportEndDate
                value={product.supportEndDate}
                fetching={fetching}
                onChange={value => this.setField({'supportEndDate': value})}/>

              <ProductSupportNotes
                value={product.supportNotes}
                fetching={fetching}
                onChange={value => this.setField({'supportNotes': value})}/>
            </div>

          </Form>
        </div>
      </div>
    );

  }
}

export default connectToStores(ProductView);