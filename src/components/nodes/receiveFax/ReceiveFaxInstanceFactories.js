import * as RJD from 'react-js-diagrams';
import { ReceiveFaxNodeModel } from './ReceiveFaxNodeModel';

export class ReceiveFaxNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ReceiveFaxNodeModel');
  }

  getInstance() {
    return new ReceiveFaxNodeModel();
  }
}
