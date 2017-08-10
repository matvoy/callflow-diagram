import * as RJD from 'react-js-diagrams';
import { CustomCodeNodeModel } from './CustomCodeNodeModel';

export class CustomCodeNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('CustomCodeNodeModel');
  }

  getInstance() {
    return new CustomCodeNodeModel();
  }
}
