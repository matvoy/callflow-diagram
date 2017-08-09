import * as RJD from 'react-js-diagrams';
import { VoicemailNodeModel } from './VoicemailNodeModel';

export class VoicemailNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('VoicemailNodeModel');
  }

  getInstance() {
    return new VoicemailNodeModel();
  }
}
