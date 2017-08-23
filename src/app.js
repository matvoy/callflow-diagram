import React from 'react';
// import { DragDropContextProvider } from 'react-dnd';
// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import withDragDropContext from './singleDnD';

import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import * as actions from './actions';
import { NodesPanel } from './components/NodesPanel';
import { Diagram } from './components/Diagram';
import { Controls } from './components/Controls';
import './styles/index.scss';

// @DragDropContext(HTML5Backend)
class Application extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			propertyFocused: false
		}
		this.setIsFocused = this.setIsFocused.bind(this);
		window.CallflowDiagram = {
			onNodeSelected: props.onNodeSelected.bind(this),
			clearReducer: props.onClearHistory.bind(this),
			updateModel: props.updateModel.bind(this)
		};
	}
	setIsFocused(value){
		this.setState({
			propertyFocused: value
		})
	}
  render() {
    const { model, selectedNode, onNodeSelected, updateModel, onUndo, onRedo, canUndo, canRedo } = this.props;

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
						allowDelete={!this.state.propertyFocused}
  	       />
  	      <Controls
  	        selectedNode={selectedNode}
						model={model}
						updateModel={updateModel}
						setIsFocused={this.setIsFocused}
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
  canRedo: state.future.length > 0
});

const mapDispatchToProps = dispatch => ({
  onNodeSelected: node => dispatch(actions.onNodeSelected(node)),
  updateModel: (model, props) => dispatch(actions.updateModel(model, props)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
	onClearHistory: () => dispatch(UndoActionCreators.clearHistory())
});

export const App = connect(mapStateToProps, mapDispatchToProps)(withDragDropContext(Application));
