import * as RJD from '../../../../../src/main';
import { LogicNodeWidgetFactory } from './LogicNodeWidget';

export class LogicWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('if');
  }

  generateReactWidget(diagramEngine, node) {
    return LogicNodeWidgetFactory({ node });
  }
}
