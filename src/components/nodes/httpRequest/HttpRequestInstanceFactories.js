import * as RJD from 'react-js-diagrams';
import { HttpRequestNodeModel } from './HttpRequestNodeModel';

export class HttpRequestNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('HttpRequestNodeModel');
  }

  getInstance() {
    return new HttpRequestNodeModel();
  }
}
