import * as RJD from '../../../../../src/main';
import { QueueTimerNodeModel } from './QueueTimerNodeModel';

export class QueueTimerNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('QueueTimerNodeModel');
  }

  getInstance() {
    return new QueueTimerNodeModel();
  }
}
