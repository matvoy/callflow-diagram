import * as RJD from 'react-js-diagrams';
import { StopNodeWidgetFactory } from './StopNodeWidget';

export class StopWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('stop');
  }

  generateReactWidget(diagramEngine, node) {
    return StopNodeWidgetFactory({ node });
  }
}
