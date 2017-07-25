import * as RJD from '../../../../../src/main';
import { PlaybackNodeModel } from './PlaybackNodeModel';

export class PlaybackNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('PlaybackNodeModel');
  }

  getInstance() {
    return new PlaybackNodeModel();
  }
}
