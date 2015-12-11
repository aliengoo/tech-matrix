import React, {Component, PropTypes} from 'react';

export default class ProductsTable extends Component {

  constructor(props) {
    super(props);
    this.renderProducts = this.renderProducts.bind(this);
    this.renderNoProducts = this.renderNoProducts.bind(this);
  }


  render() {

    const {products, fetching} = this.props;

    var content;

    if (fetching) {
      content = this.renderFetching();
    } else {
      if (products.length === 0) {
        content = this.renderNoProducts();
      } else {
        content = this.renderProducts();
      }
    }

    return content;
  }

  renderNoProducts() {
    return (
      <div>
        <h1 className="text-center text-muted">No results</h1>
      </div>);
  }

  renderProducts(products) {
    return (
      <table className="table table-hover">
        <thead>
        <tr>
          <th>Name</th>
          <th>Business owner(s)</th>
          <th>Technology owner(s)</th>
          <th>Maintenance end date</th>
          <th>Support end date</th>
        </tr>
        </thead>
        <tbody>
        {products.map((product, key) => {
          return (
            <tr key={key}>
              <td>{product.name}</td>
              <td>{product.technologyOwners}</td>
              <td>{product.businessOwners}</td>
              <td>{product.maintenanceEndDate}</td>
              <td>{product.supportEndDate}</td>
            </tr>);
        })}
        </tbody>
      </table>
    );
  }

  renderFetching() {
    return (
      <div>
        <h1 className="text-center text-muted">Loading...</h1>
      </div>);
  }
}

ProductsTable.defaultProps = {
  products: [],
  fetching: false
};

ProductsTable.propTypes = {
  products: PropTypes.array,
  fetching: PropTypes.bool
};