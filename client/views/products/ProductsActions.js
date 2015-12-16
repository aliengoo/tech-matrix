import alt from '../../alt';
import AppActions from '../AppActions';

class ProductsActions {

  runFilter(filter) {
    AppActions.fetchStarted();

    this.dispatch();


  }
}

export default alt.createActions(ProductsActions);

