import * as RJD from 'react-js-diagrams';
import { BlackListNodeModel } from './BlackListNodeModel';

export class BlackListNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('BlackListNodeModel');
  }

  getInstance() {
    return new BlackListNodeModel();
  }
}
