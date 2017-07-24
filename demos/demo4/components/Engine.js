import React from 'react';
import * as RJD from '../../../src/main';
import { StartWidgetFactory } from './nodes/start/StartWidgetFactory';
import { StartNodeFactory } from './nodes/start/StartInstanceFactories';
import { StopWidgetFactory } from './nodes/stop/StopWidgetFactory';
import { StopNodeFactory } from './nodes/stop/StopInstanceFactories';
import { ConnectionWidgetFactory } from './nodes/connection/ConnectionWidgetFactory';
import { ConnectionNodeFactory } from './nodes/connection/ConnectionInstanceFactories';

// Setup the diagram engine
export const diagramEngine = new RJD.DiagramEngine();
diagramEngine.registerNodeFactory(new RJD.DefaultNodeFactory());
diagramEngine.registerLinkFactory(new RJD.DefaultLinkFactory());
diagramEngine.registerNodeFactory(new StartWidgetFactory());
diagramEngine.registerNodeFactory(new StopWidgetFactory());
diagramEngine.registerNodeFactory(new ConnectionWidgetFactory());

// Register instance factories
diagramEngine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
diagramEngine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
diagramEngine.registerInstanceFactory(new RJD.LinkInstanceFactory());
diagramEngine.registerInstanceFactory(new StartNodeFactory());
diagramEngine.registerInstanceFactory(new StopNodeFactory());
diagramEngine.registerInstanceFactory(new ConnectionNodeFactory());
