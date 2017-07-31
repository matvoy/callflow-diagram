import * as RJD from '../../../../../src/main';
import { QueueTimerNodeWidgetFactory } from './QueueTimerNodeWidget';

export class QueueTimerWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('queueTimer');
  }

  generateReactWidget(diagramEngine, node) {
    return QueueTimerNodeWidgetFactory({ node });
  }
}
