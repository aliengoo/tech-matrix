import _ from 'lodash';
import axios from 'axios';
import Q from 'q';

export default class ModelApi {
  constructor(modelName) {
    this.modelName = modelName;
    this.baseUrl = `/api/${modelName}`;
    this._fromJson = this._fromJson.bind(this);
    this._toSelectOptions = this._toSelectOptions.bind(this);
  }

  _fromJson(data) {
    return JSON.parse(data);
  }

  _toSelectOptions(data) {
    let options = [];

    for(let item of data) {
      options.push({
        value: item._id, label: item.name
      });
    }

    return options;
  }

  getNames() {
    return axios.get(`${this.baseUrl}/meta/names`, {
      transformResponse: [
        this._fromJson,
        this._toSelectOptions
      ]
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

  pagedQuery(page, query) {
    return axios.post(`${this.baseUrl}/paged-query`, {page, query});
  }

  textSearch(query) {
    return axios.post(`${this.baseUrl}/text-search`, {query});
  }
}