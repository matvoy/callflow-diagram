import * as RJD from 'react-js-diagrams';
import { PlaybackNodeModel } from './PlaybackNodeModel';

export class PlaybackNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('PlaybackNodeModel');
  }

  getInstance() {
    return new PlaybackNodeModel();
  }
}
