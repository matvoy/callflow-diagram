import * as RJD from 'react-js-diagrams';
import { CalendarNodeModel } from './CalendarNodeModel';

export class CalendarNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('CalendarNodeModel');
  }

  getInstance() {
    return new CalendarNodeModel();
  }
}
