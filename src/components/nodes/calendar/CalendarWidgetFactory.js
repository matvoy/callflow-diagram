import * as RJD from 'react-js-diagrams';
import { CalendarNodeWidgetFactory } from './CalendarNodeWidget';

export class CalendarWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('calendar');
  }

  generateReactWidget(diagramEngine, node) {
    return CalendarNodeWidgetFactory({ node });
  }
}
