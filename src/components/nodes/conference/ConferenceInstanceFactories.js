import * as RJD from 'react-js-diagrams';
import { ConferenceNodeModel } from './ConferenceNodeModel';

export class ConferenceNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('ConferenceNodeModel');
  }

  getInstance() {
    return new ConferenceNodeModel();
  }
}
