import * as RJD from 'react-js-diagrams';
import { OutboundCallNodeWidgetFactory } from './OutboundCallNodeWidget';

export class OutboundCallWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('outboundCall');
  }

  generateReactWidget(diagramEngine, node) {
    return OutboundCallNodeWidgetFactory({ node });
  }
}
