import * as RJD from 'react-js-diagrams';
import { VariablesNodeWidgetFactory } from './VariablesNodeWidget';

export class VariablesWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('variables');
  }

  generateReactWidget(diagramEngine, node) {
    return VariablesNodeWidgetFactory({ node });
  }
}
