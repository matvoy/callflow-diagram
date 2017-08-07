import * as RJD from 'react-js-diagrams';
import { PlayNDigitsNodeModel } from './PlayNDigitsNodeModel';

export class PlayNDigitsNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('PlayNDigitsNodeModel');
  }

  getInstance() {
    return new PlayNDigitsNodeModel();
  }
}
