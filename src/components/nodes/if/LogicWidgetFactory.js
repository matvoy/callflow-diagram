import * as RJD from 'react-js-diagrams';
import { LogicNodeWidgetFactory } from './LogicNodeWidget';

export class LogicWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('if');
  }

  generateReactWidget(diagramEngine, node) {
    return LogicNodeWidgetFactory({ node });
  }
}
