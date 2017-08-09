import React from 'react';
import * as RJD from 'react-js-diagrams';
import { LinkInstanceFactory } from './ExtendedLinkModel';
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
import { LogWidgetFactory } from './nodes/log/LogWidgetFactory';
import { LogNodeFactory } from './nodes/log/LogInstanceFactories';
import { LogicWidgetFactory } from './nodes/if/LogicWidgetFactory';
import { LogicNodeFactory } from './nodes/if/LogicInstanceFactories';
import { QueueTimerWidgetFactory } from './nodes/queue_timer/QueueTimerWidgetFactory';
import { QueueTimerNodeFactory } from './nodes/queue_timer/QueueTimerInstanceFactories';
import { QueueWidgetFactory } from './nodes/queue/QueueWidgetFactory';
import { QueueNodeFactory } from './nodes/queue/QueueInstanceFactories';
import { EchoWidgetFactory } from './nodes/echo/EchoWidgetFactory';
import { EchoNodeFactory } from './nodes/echo/EchoInstanceFactories';
import { SleepWidgetFactory } from './nodes/sleep/SleepWidgetFactory';
import { SleepNodeFactory } from './nodes/sleep/SleepInstanceFactories';
import { RecordSessionWidgetFactory } from './nodes/recordSession/RecordSessionWidgetFactory';
import { RecordSessionNodeFactory } from './nodes/recordSession/RecordSessionInstanceFactories';
import { RecordFileWidgetFactory } from './nodes/recordFile/RecordFileWidgetFactory';
import { RecordFileNodeFactory } from './nodes/recordFile/RecordFileInstanceFactories';
import { SwitchWidgetFactory } from './nodes/switch/SwitchWidgetFactory';
import { SwitchNodeFactory } from './nodes/switch/SwitchInstanceFactories';
import { BlackListWidgetFactory } from './nodes/blackList/BlackListWidgetFactory';
import { BlackListNodeFactory } from './nodes/blackList/BlackListInstanceFactories';
import { CalendarWidgetFactory } from './nodes/calendar/CalendarWidgetFactory';
import { CalendarNodeFactory } from './nodes/calendar/CalendarInstanceFactories';
import { ConferenceWidgetFactory } from './nodes/conference/ConferenceWidgetFactory';
import { ConferenceNodeFactory } from './nodes/conference/ConferenceInstanceFactories';
import { UsersWidgetFactory } from './nodes/users/UsersWidgetFactory';
import { UsersNodeFactory } from './nodes/users/UsersInstanceFactories';
import { OutboundCallWidgetFactory } from './nodes/outboundCall/OutboundCallWidgetFactory';
import { OutboundCallNodeFactory } from './nodes/outboundCall/OutboundCallInstanceFactories';
import { PlayNDigitsWidgetFactory } from './nodes/playNdigits/PlayNDigitsWidgetFactory';
import { PlayNDigitsNodeFactory } from './nodes/playNdigits/PlayNDigitsInstanceFactories';
import { SendEmailWidgetFactory } from './nodes/sendEmail/SendEmailWidgetFactory';
import { SendEmailNodeFactory } from './nodes/sendEmail/SendEmailInstanceFactories';
import { ReceiveFaxWidgetFactory } from './nodes/receiveFax/ReceiveFaxWidgetFactory';
import { ReceiveFaxNodeFactory } from './nodes/receiveFax/ReceiveFaxInstanceFactories';
import { HttpRequestWidgetFactory } from './nodes/httpRequest/HttpRequestWidgetFactory';
import { HttpRequestNodeFactory } from './nodes/httpRequest/HttpRequestInstanceFactories';
import { ParkWidgetFactory } from './nodes/park/ParkWidgetFactory';
import { ParkNodeFactory } from './nodes/park/ParkInstanceFactories';
import { PickupWidgetFactory } from './nodes/pickup/PickupWidgetFactory';
import { PickupNodeFactory } from './nodes/pickup/PickupInstanceFactories';
import { TtsWidgetFactory } from './nodes/tts/TtsWidgetFactory';
import { TtsNodeFactory } from './nodes/tts/TtsInstanceFactories';
import { VariablesWidgetFactory } from './nodes/variables/VariablesWidgetFactory';
import { VariablesNodeFactory } from './nodes/variables/VariablesInstanceFactories';
import { VoicemailWidgetFactory } from './nodes/voicemail/VoicemailWidgetFactory';
import { VoicemailNodeFactory } from './nodes/voicemail/VoicemailInstanceFactories';

// Setup the diagram engine
export const diagramEngine = new RJD.DiagramEngine();
diagramEngine.registerNodeFactory(new RJD.DefaultNodeFactory());
diagramEngine.registerLinkFactory(new RJD.DefaultLinkFactory());
diagramEngine.registerNodeFactory(new StartWidgetFactory());
diagramEngine.registerNodeFactory(new StopWidgetFactory());
diagramEngine.registerNodeFactory(new AnswerWidgetFactory());
diagramEngine.registerNodeFactory(new HangupWidgetFactory());
diagramEngine.registerNodeFactory(new PlaybackWidgetFactory());
diagramEngine.registerNodeFactory(new LogWidgetFactory());
diagramEngine.registerNodeFactory(new LogicWidgetFactory());
diagramEngine.registerNodeFactory(new QueueWidgetFactory());
diagramEngine.registerNodeFactory(new QueueTimerWidgetFactory());
diagramEngine.registerNodeFactory(new EchoWidgetFactory());
diagramEngine.registerNodeFactory(new SleepWidgetFactory());
diagramEngine.registerNodeFactory(new RecordSessionWidgetFactory());
diagramEngine.registerNodeFactory(new RecordFileWidgetFactory());
diagramEngine.registerNodeFactory(new SwitchWidgetFactory());
diagramEngine.registerNodeFactory(new BlackListWidgetFactory());
diagramEngine.registerNodeFactory(new CalendarWidgetFactory());
diagramEngine.registerNodeFactory(new ConferenceWidgetFactory());
diagramEngine.registerNodeFactory(new UsersWidgetFactory());
diagramEngine.registerNodeFactory(new OutboundCallWidgetFactory());
diagramEngine.registerNodeFactory(new PlayNDigitsWidgetFactory());
diagramEngine.registerNodeFactory(new SendEmailWidgetFactory());
diagramEngine.registerNodeFactory(new ReceiveFaxWidgetFactory());
diagramEngine.registerNodeFactory(new HttpRequestWidgetFactory());
diagramEngine.registerNodeFactory(new ParkWidgetFactory());
diagramEngine.registerNodeFactory(new PickupWidgetFactory());
diagramEngine.registerNodeFactory(new TtsWidgetFactory());
diagramEngine.registerNodeFactory(new VariablesWidgetFactory());
diagramEngine.registerNodeFactory(new VoicemailWidgetFactory());

// Register instance factories
diagramEngine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory());
diagramEngine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory());
diagramEngine.registerInstanceFactory(new LinkInstanceFactory());
diagramEngine.registerInstanceFactory(new StartNodeFactory());
diagramEngine.registerInstanceFactory(new StopNodeFactory());
diagramEngine.registerInstanceFactory(new AnswerNodeFactory());
diagramEngine.registerInstanceFactory(new HangupNodeFactory());
diagramEngine.registerInstanceFactory(new PlaybackNodeFactory());
diagramEngine.registerInstanceFactory(new LogNodeFactory());
diagramEngine.registerInstanceFactory(new LogicNodeFactory());
diagramEngine.registerInstanceFactory(new QueueNodeFactory());
diagramEngine.registerInstanceFactory(new QueueTimerNodeFactory());
diagramEngine.registerInstanceFactory(new EchoNodeFactory());
diagramEngine.registerInstanceFactory(new SleepNodeFactory());
diagramEngine.registerInstanceFactory(new RecordSessionNodeFactory());
diagramEngine.registerInstanceFactory(new RecordFileNodeFactory());
diagramEngine.registerInstanceFactory(new SwitchNodeFactory());
diagramEngine.registerInstanceFactory(new BlackListNodeFactory());
diagramEngine.registerInstanceFactory(new CalendarNodeFactory());
diagramEngine.registerInstanceFactory(new ConferenceNodeFactory());
diagramEngine.registerInstanceFactory(new UsersNodeFactory());
diagramEngine.registerInstanceFactory(new OutboundCallNodeFactory());
diagramEngine.registerInstanceFactory(new PlayNDigitsNodeFactory());
diagramEngine.registerInstanceFactory(new SendEmailNodeFactory());
diagramEngine.registerInstanceFactory(new ReceiveFaxNodeFactory());
diagramEngine.registerInstanceFactory(new HttpRequestNodeFactory());
diagramEngine.registerInstanceFactory(new ParkNodeFactory());
diagramEngine.registerInstanceFactory(new PickupNodeFactory());
diagramEngine.registerInstanceFactory(new TtsNodeFactory());
diagramEngine.registerInstanceFactory(new VariablesNodeFactory());
diagramEngine.registerInstanceFactory(new VoicemailNodeFactory());
