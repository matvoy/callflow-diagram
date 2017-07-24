import React from 'react';
import { Parameters } from './Parameters';

export class Controls extends React.Component {
  render() {
    const { selectedNode, onUndo, onRedo, canUndo, canRedo } = this.props;
    const content = selectedNode ? JSON.stringify(selectedNode.serialize(), null, 2) : '';
	const param = selectedNode&&(selectedNode.nodeType!='start'&&selectedNode.nodeType!='stop') ? (<Parameters node={selectedNode}/>) : null;
  	return (
  	  <div className='controls'>
  	    <div>
  	      <button onClick={onUndo} disabled={!canUndo}>Undo</button>
  	      <button onClick={onRedo} disabled={!canRedo}>Redo</button>
  	    </div>
		  {param}
  	    <pre>
  	      {content}
  	    </pre>
    	</div>
  	);
  }
}
