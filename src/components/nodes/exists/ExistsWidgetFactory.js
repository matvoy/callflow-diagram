import * as RJD from 'react-js-diagrams';
import { ExistsNodeWidgetFactory } from './ExistsNodeWidget';

export class ExistsWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('exists');
  }

  generateReactWidget(diagramEngine, node) {
    return ExistsNodeWidgetFactory({ node });
  }
}
