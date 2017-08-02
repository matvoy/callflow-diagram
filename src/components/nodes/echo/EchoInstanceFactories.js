import * as RJD from 'react-js-diagrams';
import { EchoNodeModel } from './EchoNodeModel';

export class EchoNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('EchoNodeModel');
  }

  getInstance() {
    return new EchoNodeModel();
  }
}
