import React from 'react';
import * as RJD from '../../../src/main';
import { StartWidgetFactory } from './nodes/start/StartWidgetFactory';
import { StartNodeFactory } from './nodes/start/StartInstanceFactories';
import { StopWidgetFactory } from './nodes/stop/StopWidgetFactory';
import { StopNodeFactory } from './nodes/stop/StopInstanceFactories';
import { AnswerWidgetFactory } from './nodes/answer/AnswerWidgetFactory';
import { AnswerNodeFactory } from './nodes/answer/AnswerInstanceFactories';
import { HangupWidgetFactory } from './nodes/hangup/HangupWidgetFactory';
import { HangupNodeFactory } from './nodes/hangup/HangupInstanceFactories';
import { PlaybackWidgetFactory } from './nodes/playback/PlaybackWidgetFactory';
import { PlaybackNodeFactory } from './nodes/playback/PlaybackInstanceFactories';

// Setup the diagram engine
export const diagramEngine = new RJD.DiagramEngine();
diagramEngine.registerNodeFactory(new RJD.DefaultNodeFactory());
diagramEngine.registerLinkFactory(new RJD.DefaultLinkFactory());
diagramEngine.registerNodeFactory(new StartWidgetFactory());
diagramEngine.registerNodeFactory(new StopWidgetFactory());
diagramEngine.registerNodeFactory(new AnswerWidgetFactory());
diagramEngine.registerNodeFactory(new HangupWidgetFactory());
diagramEngine.registerNodeFactory(new PlaybackWidgetFactory());

// Register instance factories
diagramEngine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
diagramEngine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
diagramEngine.registerInstanceFactory(new RJD.LinkInstanceFactory());
diagramEngine.registerInstanceFactory(new StartNodeFactory());
diagramEngine.registerInstanceFactory(new StopNodeFactory());
diagramEngine.registerInstanceFactory(new AnswerNodeFactory());
diagramEngine.registerInstanceFactory(new HangupNodeFactory());
diagramEngine.registerInstanceFactory(new PlaybackNodeFactory());
