import * as RJD from 'react-js-diagrams';
import { QueueTimerNodeWidgetFactory } from './QueueTimerNodeWidget';

export class QueueTimerWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('queueTimer');
  }

  generateReactWidget(diagramEngine, node) {
    return QueueTimerNodeWidgetFactory({ node });
  }
}
