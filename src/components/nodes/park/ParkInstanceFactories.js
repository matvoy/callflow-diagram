import * as RJD from 'react-js-diagrams';
import { ParkNodeModel } from './ParkNodeModel';

export class ParkNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ParkNodeModel');
  }

  getInstance() {
    return new ParkNodeModel();
  }
}
