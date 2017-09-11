import React from 'react';
// import { DragDropContextProvider } from 'react-dnd';
// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import withDragDropContext from './singleDnD';
import Element from './components/PropertyValues';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import * as actions from './actions';
import { NodesPanel } from './components/NodesPanel';
import { Diagram } from './components/Diagram';
import { Controls } from './components/Controls';
import { DiagramCreator } from './components/DiagramCreator';
import WebitelEvent from './components/WebitelEvent';
import './styles/index.scss';

// @DragDropContext(HTML5Backend)
class Application extends React.Component {
	constructor(props){
		super(props);
		window.CallflowDiagram = {
			onDebug: new WebitelEvent(),
			onNodeSelected: props.onNodeSelected.bind(this),
			clearReducer: props.onClearHistory.bind(this),
			updateModel: props.updateModel.bind(this),
			setWebitelParams: (params) => {
				Element.webitelParams = params
			},
			createDiagram: (json) => {
				let diagram = new DiagramCreator(json);
				props.updateModel(diagram.getModel());
				return diagram.getModel();
			}
		};
	}
  render() {
    const { model, selectedNode, onNodeSelected, updateModel, onUndo, onRedo, canUndo, canRedo, propertyFocused, setIsFocused} = this.props;

  	return (
    	  <div className='parent-container'>
    	    <NodesPanel />
  	      <Diagram
						onUndo={onUndo}
						onRedo={onRedo}
						canUndo={canUndo}
						canRedo={canRedo}
  	        model={model}
  	        updateModel={updateModel}
  	        onNodeSelected={onNodeSelected}
						allowDelete={!propertyFocused}
  	       />
  	      <Controls
  	        selectedNode={selectedNode}
						model={model}
						updateModel={updateModel}
						setIsFocused={setIsFocused}
  	       />
    	  </div>
  	  // </DragDropContextProvider>
  	);
  }
}

const mapStateToProps = state => ({
  selectedNode: state.present.selectedNode,
  model: state.present.model,
  canUndo: state.past.length > 1,
  canRedo: state.future.length > 0,
	propertyFocused: state.present.propertyFocused
});

const mapDispatchToProps = dispatch => ({
  onNodeSelected: node => dispatch(actions.onNodeSelected(node)),
  updateModel: (model, props) => dispatch(actions.updateModel(model, props)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
	onClearHistory: () => dispatch(UndoActionCreators.clearHistory()),
	setIsFocused: focused => dispatch(actions.setIsFocused(focused))
});

export const App = connect(mapStateToProps, mapDispatchToProps)(withDragDropContext(Application));
