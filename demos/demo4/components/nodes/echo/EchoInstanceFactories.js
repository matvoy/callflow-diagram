import * as RJD from '../../../../../src/main';
import { EchoNodeModel } from './EchoNodeModel';

export class EchoNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('EchoNodeModel');
  }

  getInstance() {
    return new EchoNodeModel();
  }
}
