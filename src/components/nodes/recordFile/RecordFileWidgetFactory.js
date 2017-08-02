import * as RJD from 'react-js-diagrams';
import { RecordFileNodeWidgetFactory } from './RecordFileNodeWidget';

export class RecordFileWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('recordFile');
  }

  generateReactWidget(diagramEngine, node) {
    return RecordFileNodeWidgetFactory({ node });
  }
}
