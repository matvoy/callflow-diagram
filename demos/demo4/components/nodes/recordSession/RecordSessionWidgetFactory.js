import * as RJD from '../../../../../src/main';
import { RecordSessionNodeWidgetFactory } from './RecordSessionNodeWidget';

export class RecordSessionWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('recordSession');
  }

  generateReactWidget(diagramEngine, node) {
    return RecordSessionNodeWidgetFactory({ node });
  }
}
