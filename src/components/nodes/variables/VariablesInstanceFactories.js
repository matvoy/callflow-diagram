import * as RJD from 'react-js-diagrams';
import { VariablesNodeModel } from './VariablesNodeModel';

export class VariablesNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('VariablesNodeModel');
  }

  getInstance() {
    return new VariablesNodeModel();
  }
}
