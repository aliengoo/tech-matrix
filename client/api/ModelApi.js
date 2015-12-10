import _ from 'lodash';
import axios from 'axios';
import Q from 'q';

export default class ModelApi {
  constructor(modelName) {
    this.modelName = modelName;
    this.baseUrl = `/api/${modelName}`;
  }

  getNames() {
    return axios.get(`${this.baseUrl}/meta/names`, {
      transformResponse: [function(data){
        return JSON.parse(data);
      }, function (data) {
        let options = [];

        _.forEach(data, (item) => {
          options.push({
            value: item._id, label: item.name
          });
        });
        return options;
      }]
    });
  }

  insert(model) {
    return axios.post(this.baseUrl, model);
  }

  get(id) {
    return axios.get(`${this.baseUrl}/${id}`);
  }

  update(model) {
    return axios.put(`${this.baseUrl}/${id}`, model);
  }

  remove(id) {
    return axios.delete(`${this.baseUrl}/${id}`);
  }
}