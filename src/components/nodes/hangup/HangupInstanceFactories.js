import * as RJD from 'react-js-diagrams';
import { HangupNodeModel } from './HangupNodeModel';

export class HangupNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('HangupNodeModel');
  }

  getInstance() {
    return new HangupNodeModel();
  }
}
