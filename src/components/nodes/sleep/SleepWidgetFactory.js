import * as RJD from 'react-js-diagrams';
import { SleepNodeWidgetFactory } from './SleepNodeWidget';

export class SleepWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('sleep');
  }

  generateReactWidget(diagramEngine, node) {
    return SleepNodeWidgetFactory({ node });
  }
}
