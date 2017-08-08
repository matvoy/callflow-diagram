import * as RJD from 'react-js-diagrams';
import { HttpRequestNodeWidgetFactory } from './HttpRequestNodeWidget';

export class HttpRequestWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('httpRequest');
  }

  generateReactWidget(diagramEngine, node) {
    return HttpRequestNodeWidgetFactory({ node });
  }
}
