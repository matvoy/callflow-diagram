import * as RJD from 'react-js-diagrams';
import { ExistsNodeModel } from './ExistsNodeModel';

export class ExistsNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ExistsNodeModel');
  }

  getInstance() {
    return new ExistsNodeModel();
  }
}
