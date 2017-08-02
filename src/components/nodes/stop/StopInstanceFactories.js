import * as RJD from 'react-js-diagrams';
import { StopNodeModel } from './StopNodeModel';

export class StopNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('StopNodeModel');
  }

  getInstance() {
    return new StopNodeModel();
  }
}
