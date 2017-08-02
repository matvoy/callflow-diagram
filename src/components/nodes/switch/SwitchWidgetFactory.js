import * as RJD from 'react-js-diagrams';
import { SwitchNodeWidgetFactory } from './SwitchNodeWidget';

export class SwitchWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('switch');
  }

  generateReactWidget(diagramEngine, node) {
    return SwitchNodeWidgetFactory({ node });
  }
}
