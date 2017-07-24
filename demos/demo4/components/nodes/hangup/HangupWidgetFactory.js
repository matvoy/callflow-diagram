import * as RJD from '../../../../../src/main';
import { HangupNodeWidgetFactory } from './HangupNodeWidget';

export class HangupWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('hangup');
  }

  generateReactWidget(diagramEngine, node) {
    return HangupNodeWidgetFactory({ node });
  }
}
