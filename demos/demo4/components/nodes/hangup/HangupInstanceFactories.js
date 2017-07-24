import * as RJD from '../../../../../src/main';
import { HangupNodeModel } from './HangupNodeModel';

export class HangupNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('HangupNodeModel');
  }

  getInstance() {
    return new HangupNodeModel();
  }
}
