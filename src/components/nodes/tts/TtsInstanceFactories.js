import * as RJD from 'react-js-diagrams';
import { TtsNodeModel } from './TtsNodeModel';

export class TtsNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('TtsNodeModel');
  }

  getInstance() {
    return new TtsNodeModel();
  }
}
