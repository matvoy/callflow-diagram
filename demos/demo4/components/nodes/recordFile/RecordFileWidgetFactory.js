import * as RJD from '../../../../../src/main';
import { RecordFileNodeWidgetFactory } from './RecordFileNodeWidget';

export class RecordFileWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('recordFile');
  }

  generateReactWidget(diagramEngine, node) {
    return RecordFileNodeWidgetFactory({ node });
  }
}
