import * as RJD from '../../../../../src/main';
import { SleepNodeWidgetFactory } from './SleepNodeWidget';

export class SleepWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('sleep');
  }

  generateReactWidget(diagramEngine, node) {
    return SleepNodeWidgetFactory({ node });
  }
}
