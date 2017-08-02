import * as RJD from 'react-js-diagrams';
import { HangupNodeWidgetFactory } from './HangupNodeWidget';

export class HangupWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('hangup');
  }

  generateReactWidget(diagramEngine, node) {
    return HangupNodeWidgetFactory({ node });
  }
}
