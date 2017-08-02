import * as RJD from 'react-js-diagrams';
import { LogNodeWidgetFactory } from './LogNodeWidget';

export class LogWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('log');
  }

  generateReactWidget(diagramEngine, node) {
    return LogNodeWidgetFactory({ node });
  }
}
