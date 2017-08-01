import * as RJD from '../../../../../src/main';
import { SwitchNodeWidgetFactory } from './SwitchNodeWidget';

export class SwitchWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('switch');
  }

  generateReactWidget(diagramEngine, node) {
    return SwitchNodeWidgetFactory({ node });
  }
}
