/**
 * Created by matvij on 08.05.18.
 */
import React, { Component } from 'react';

class JSONInput extends Component {
	constructor(props){
		super(props);
		if(!('id' in this.props)) console.error('An \'id\' property must be specified. Must be unique');
		this.createMarkup       = this.createMarkup        .bind(this);
		this.rawTextContent     = this.rawTextContent      .bind(this);
		this.formatSpacing      = this.formatSpacing       .bind(this);
		this.formatColors       = this.formatColors        .bind(this);
		this.onClick            = this.onClick             .bind(this);
		this.onBlur             = this.onBlur              .bind(this);
		this.update             = this.update              .bind(this);
		this.renderLabels       = this.renderLabels        .bind(this);
		this.renderErrorMessage = this.renderErrorMessage  .bind(this);
		this.onScroll           = this.onScroll            .bind(this);
		this.showPlaceholder    = this.showPlaceholder     .bind(this);
		this.addDoubleQuotes    = this.addDoubleQuotes     .bind(this);
		this.removeQuotes       = this.removeQuotes        .bind(this);
		this.reduceDoubleQuotes = this.reduceDoubleQuotes  .bind(this);
		this.state   = {
			preText     : '',
			markupText  : '',
			plainText   : '',
			jsonText    : '',
			jsObject    : undefined,
			lines       : false,
			error       : false,
			focused     : false
		};
	}
	render(){
		const { markupText, error, focused } = this.state;
		const hasError = error ? error.token ? true : false : false;
		return (
			<div
				style = {{
					display    : 'block',
					overflow   : 'none',
					height     : 'height' in this.props ? (parseInt(this.props.height.replace(/px/,'')) + 60) + 'px' : '610px',
					width      : '100%',
					margin     : 0,
					boxSizing  : 'border-box',
					overflow   : 'hidden',
					fontFamily : 'Roboto, sans-serif'
				}}
			>
				<div
					className = 'row text-left vertical-align-bottom'
					style = {{
						display         : 'block',
						overflow        : 'none',
						height          : '60px',
						width           : '100%',
						margin          : 0,
						backgroundColor : 'colors' in this.props ? 'background' in this.props.colors ? this.props.colors.background : '#1E1E1E' : '#1E1E1E',
						borderBottom    : '2px solid ' + ( 'colors' in this.props ? 'border' in this.props.colors ? this.props.colors.border : '#000000' : '#000000' )
					}}
				>
                    <span
											style = {{
												display : 'inline-block',
												height  : '60px',
												width   : '60px',
												margin  : 0,
												boxSizing : 'border-box',
												overflow : 'hidden',
												verticalAlign : 'top'
											}}
										>
                        <div
													style = {{
														position : 'relative',
														top      : 0,
														left     : 0,
														height   : '60px',
														width    : '60px',
														margin   : 0
													}}
												>
                            <div
															style = {{
																position  : 'absolute',
																top       : '50%',
																left      : '50%',
																transform : 'translate(-50%, -50%)'
															}}
														>
                                <svg
																	height = '25px'
																	width  = '25px'
																	viewBox = '0 0 100 100'
																>
                                    {
																			hasError ?
																				<path
																					fillRule ='evenodd'
																					clipRule ='evenodd'
																					fill     = 'red'
																					d        = 'M73.9,5.75c0.467-0.467,1.067-0.7,1.8-0.7c0.7,0,1.283,0.233,1.75,0.7l16.8,16.8  c0.467,0.5,0.7,1.084,0.7,1.75c0,0.733-0.233,1.334-0.7,1.801L70.35,50l23.9,23.95c0.5,0.467,0.75,1.066,0.75,1.8  c0,0.667-0.25,1.25-0.75,1.75l-16.8,16.75c-0.534,0.467-1.117,0.7-1.75,0.7s-1.233-0.233-1.8-0.7L50,70.351L26.1,94.25  c-0.567,0.467-1.167,0.7-1.8,0.7c-0.667,0-1.283-0.233-1.85-0.7L5.75,77.5C5.25,77,5,76.417,5,75.75c0-0.733,0.25-1.333,0.75-1.8  L29.65,50L5.75,26.101C5.25,25.667,5,25.066,5,24.3c0-0.666,0.25-1.25,0.75-1.75l16.8-16.8c0.467-0.467,1.05-0.7,1.75-0.7  c0.733,0,1.333,0.233,1.8,0.7L50,29.65L73.9,5.75z'
																				/>
																				:
																				<path
																					fillRule = 'evenodd'
																					clipRule = 'evenodd'
																					fill     = 'green'
																					d='M39.363,79L16,55.49l11.347-11.419L39.694,56.49L72.983,23L84,34.085L39.363,79z'
																				/>
																		}
                                </svg>
                            </div>
                        </div>
                    </span>
					<span
						style = {{
							display       : 'inline-block',
							height        : '60px',
							width         : '100%',
							margin        : 0,
							overflow      : 'hidden',
							verticalAlign : 'top',
							position      : 'absolute'
						}}
					>
                        { this.renderErrorMessage() }
                    </span>
				</div>
				<div
					className = 'row'
					style = {{
						display         : 'block',
						overflow        : 'none',
						height          : 'height' in this.props ? this.props.height : '550px',
						width           : '100%',
						margin          : 0,
						resize          : 'none',
						fontFamily      : 'Roboto Mono, Monaco, monospace',
						fontSize        : '11px',
						backgroundColor : 'colors' in this.props ? 'background' in this.props.colors ? this.props.colors.background : '#1E1E1E' : '#1E1E1E'
					}}
				>
					<div
						id = {'ared7_jsonviewer_labels' + this.props.id}
						style = {{
							display   : 'inline-block',
							boxSizing : 'border-box',
							height    : '100%',
							width     : '7%',
							margin    : 0,
							padding   : '5px 0px 5px 10px',
							overflow  : 'hidden',
							color     : '#D4D4D4'
						}}
					>
						{ this.renderLabels() }
					</div>
					<div
						id = {'ared7_jsonviewer_body' + this.props.id}
						contentEditable = { true }
						style = {{
							display   : 'inline-block',
							boxSizing : 'border-box',
							height    : '100%',
							width     : '93%',
							margin    : 0,
							padding   : '5px',
							overflowX : 'hidden',
							overflowY : 'auto',
							wordWrap  : 'break-word',
							color     : '#D4D4D4'
						}}
						dangerouslySetInnerHTML = { this.createMarkup(markupText) }
						onClick        = { this.onClick }
						onBlur         = { this.onBlur }
						onFocus={()=>{this.props.setIsFocused(true)}}
						onScroll       = { this.onScroll }
						autoComplete   = 'off'
						autoCorrect    = 'off'
						autoCapitalize = 'off'
						spellCheck     = { false }
					/>
				</div>
			</div>
		);
	}
	renderErrorMessage(){
		const { error } = this.state;
		return (
			<p
				style = {{
					color          : 'red',
					fontSize       : '12px',
					position       : 'absolute',
					width          : '245px',
					height         : '60px',
					boxSizing      : 'border-box',
					margin         : 0,
					padding        : 0,
					paddingRight   : '10px',
					overflowWrap   : 'break-word',
					display        : 'flex',
					flexDirection  : 'column',
					justifyContent : 'center'
				}}
			>
				{ error.token && error.token !== 2 ? 'Unexpected token: ( ' + error.token + ' ) at line ' + error.line + ' character ' + error.charPosition_relative : ' ' }
				{ error.token && error.token !== 2 ? <br/> : void(0) }
				{ error.token ? error.reason : ' ' }
			</p>
		);
	}
	renderLabels(){
		let { lines, error } = this.state;
		let line;
		if(error) line = error.line;
		if([null,undefined,false,0,''].indexOf(lines)>-1) lines = 1;
		let labels = new Array(lines);
		for(var i = 0; i < lines - 1; i++) labels[i] = i;
		return labels.map( i => {
			if(i!==line-1)
				return (
					<div
						key = {'line ' + (i + 1)}
						id  = {'line ' + (i + 1)}
					>
						{i + 1}
					</div>
				);
			return (
				<div
					key = {'line ' + (i + 1)}
					id  = {'line ' + (i + 1)}
					style = {{
						color: 'red'
					}}
				>
					{i + 1}
				</div>
			);
		});
	}
	createMarkup(markupText){ return { __html: '' + markupText }; }
	rawTextContent(){
		let
			rawText              = document.getElementById('ared7_jsonviewer_body' + this.props.id).textContent,
			noLineBreaks         = rawText.replace(/\n/g, ''),
			noCarrigeReturn      = noLineBreaks.replace(/\r/g, ''),
			noNBSP               = noCarrigeReturn.replace(/&nbsp;/g, ''),
			noDuplicateSpace     = noNBSP.replace(/\s+/g, ' ');
		// 	noSpaceOutsideString = '',
		// 	stringOpen           = false,
		// 	token                = '',
		// 	start                = 0;
		// for(var i = 0; i < noDuplicateSpace.length; i++){
		// 	token = noDuplicateSpace.charAt(i);
		// 	if(token==='"' || token==="'"){
		// 		if(!stringOpen){
		// 			var
		// 				subStr = noDuplicateSpace.substring(start,i);
		// 			length = subStr.length;
		// 			noSpaceOutsideString = noSpaceOutsideString.slice(0,-length);
		// 			noSpaceOutsideString += subStr.replace(/\s/g, '');
		// 			stringOpen = token;
		// 		}
		// 		else
		// 		if(token===stringOpen){
		// 			start      = i + 1;
		// 			stringOpen = false;
		// 		}
		// 	}
		// 	if(i===noDuplicateSpace.length-1){
		// 		var
		// 			subStr = noDuplicateSpace.substring(start,i);
		// 		length = subStr.length;
		// 		if(length>0){
		// 			noSpaceOutsideString = noSpaceOutsideString.slice(0,-length);
		// 			noSpaceOutsideString += subStr.replace(/\s/g, '');
		// 		}
		// 	}
		// 	noSpaceOutsideString += token;
		// }
		// const finalText = noSpaceOutsideString;
		// return finalText;
		return noDuplicateSpace;
	}
	formatSpacing(text){
		function StrSpace(number) {
			var space = [];
			for (var i = 0; i < number; i++) space.push(' ');
			return space.join('');
		};
		let
			result = [],
			c  = 0,
			d  = !1,
			l  = text.length;
		for (var i = 0; i < l; i++) {
			var frag = text.charAt(i);
			if(d && frag === d) text.charAt(i - 1) !== '\\' && (d = !1);
			else if (!d && (frag === '"' || frag === "'"))  d = frag;
			else if (!d && (frag === ' ' || frag === '\t')) frag = '';
			else if (!d && frag === ':')                    frag += ' ';
			else if (!d && frag === ',')                    frag += '\n' + StrSpace(c * 2);
			else if (!d && (frag === '[' || frag === '{')){
				c++, frag += '\n' + StrSpace(c * 2);
			}
			else if (!d && (frag === ']' || frag === '}')){
				c--, frag = '\n' + StrSpace(c * 2) + frag;
			}
			result.push(frag);
		}
		result = result.join('');
		return result;
	}
	formatColors(text){
		if('colors'            in this.props) var { colors }      = this.props; else var colors = {};
		if(!('default'         in colors)) colors.default         = '#D4D4D4';
		if(!('background'      in colors)) colors.background      = '#1E1E1E';
		if(!('string'          in colors)) colors.string          = '#CE8453';
		if(!('number'          in colors)) colors.number          = '#B5CE9F';
		if(!('colon'           in colors)) colors.colon           = '#49B8F7';
		if(!('keys'            in colors)) colors.keys            = '#9CDCFE';
		if(!('keys_whiteSpace' in colors)) colors.keys_whiteSpace = '#AF74A5';
		if(!('primitive'       in colors)) colors.primitive       = '#6392C6';
		var
			i            = 0,
			token        = false,
			line         = 1,
			charTotal    = text.length,
			charTotals   = [],
			result       = '',
			iterable     = [],
			nextIsValue  = false,
			stringOpen   = false,
			colonOpen    = false,
			error        = {
				charPosition_absolute : false,
				charPosition_relative : false,
				line                  : false,
				token                 : false,
				reason                : false
			};
		function captureError(reason=''){
			if(!error.token)
				error = {
					charPosition_absolute : i,
					charPosition_relative : charTotals.length > 0 ? i - charTotals[charTotals.length-1] : i,
					line                  : line,
					token                 : token,
					reason                : reason
				};
		}
		//try { let obj = JSON.parse(text)} catch(e){captureError(e)}
		function log(k,text){
			if(token===k)
				console.log('token: ' + token + ', line: ' + line + ', char: ' + ( charTotals.length > 0 ? i - charTotals[charTotals.length-1] : i )+ '\n' + text);
		}
		for(i = 0; i < charTotal; i++){
			token = text.charAt(i);
			switch(token){
				case ' ':
					token = '&nbsp;';
					break;
				case '\n':
					charTotals.push(i > 0 ? i : 0);
					token = '<br/>';
					line++;
					break;
				case '{':
					if(i>0)
						if([' ' , ',' , '\n' , '[' , ':'].indexOf(text.charAt(i-1))===-1 && !stringOpen)
							captureError('Open curly bracket cannot follow after character \'' + text.charAt(i-1) + '\'');
					if(!stringOpen){
						colonOpen = false;
						iterable.push('object');
						nextIsValue = (iterable[iterable.length-1]==='array');
					}
					break;
				case '[':
					if(i>0)
						if([' ' , ',' , '\n' , '[' , ':'].indexOf(text.charAt(i-1))===-1 && !stringOpen)
							captureError('Open bracket cannot follow after character \'' + text.charAt(i-1) + '\'');
					if(!stringOpen){
						colonOpen = false;
						iterable.push('array');
						nextIsValue = (iterable[iterable.length-1]==='array');
					}
					break;
				case '}':
					if(i<charTotal-1)
						if([' ' , ',' , '\n', ']' , '}'].indexOf(text.charAt(i+1))===-1 && !stringOpen)
							captureError('Close curly bracket cannot be follwed by character \'' + text.charAt(i+1) + '\'');
					if(!stringOpen){
						colonOpen = false;
						if(iterable[iterable.length-1]==='array')
							captureError('Expected closing bracket. Got closing curly bracket instead.');
						iterable.pop();
						nextIsValue = (iterable[iterable.length-1]==='array');
					}
					break;
				case ']':
					if(i<charTotal-1)
						if([' ' , ',' , '\n', ']' , '}'].indexOf(text.charAt(i+1))===-1 && !stringOpen)
							captureError('Close bracket cannot be follwed by character \'' + text.charAt(i+1) + '\'');
					if(!stringOpen){
						colonOpen = false;
						if(iterable[iterable.length-1]==='object')
							captureError('Expected curly closing bracket. Got closing bracket instead.');
						iterable.pop();
						nextIsValue = (iterable[iterable.length-1]==='array');
					}
					break;
				case ':':
					if(!stringOpen){
						if(!colonOpen)
							colonOpen = true;
						else
							captureError('Cannot have two consecutive colons.');
						nextIsValue = true;
						if(iterable[iterable.length-1]==='object') token = '</span><span style="color:' + colors.colon + '">' + token + '</span>';
						if(iterable[iterable.length-1]==='array')
							captureError('Cannot have colon wrapped by brackets.');
					}
					break;
				case '"': case "'":
				if(!stringOpen){
					if(['\n' , ' ' , ',' , ':' , '[' , '{'].indexOf(text.charAt(i-1))===-1)
						captureError('Opening quotes can only follow after a space, comma, colon, curly and regular opening brackets.');
					colonOpen = false;
					stringOpen = token;
					if(nextIsValue) token = '<span style="color:' + colors.string + '">' + token;
					else            token = '<span style="color:' + colors.keys_whiteSpace + '">' + token;
				}
				else {
					if(token===stringOpen){
						if(['\n' , ' ' , ',' , ':' , ']' , '}'].indexOf(text.charAt(i+1))===-1)
							captureError('Closing quotes can only be followed by space, comma, colon, curly and regular closing brackets.');
						if(!nextIsValue)
							if(token===text.charAt(i-1))
								captureError('Keys cannot be an empty string.');
						stringOpen = false;
						token += '</span>';
						nextIsValue = (iterable[iterable.length-1]==='array');
					}
				}
				break;
				case ',':
					if(!stringOpen){
						if(colonOpen)
							captureError('Cannot have a colon followed by a comma.');
						nextIsValue = (iterable[iterable.length-1]==='array');
					}
					break;
				default:
					if(i===0)
						captureError('Either opening brackets or curly brackets are expected.');
					if(!stringOpen){
						colonOpen = false;
						if(['!', '+' , '<' , '%' , '=' , '-' , '>', '~' , '(' , '/' , ')' , '*' , '?' , '`' , '@' , ';' , '^' , '|' , '\\'].indexOf(token)>-1)
							captureError('Cannot have non-alphanumeric characters outside a string. Exceptions:  $  _');
						if([' ' , ',' , ':' , '[' , ']' , '{' , '}', '"' , "'"].indexOf(token)===-1){
							if(i < text.length - 1)
								if([' ', ',' , ']' , '}','\n'].indexOf(text.charAt(i+1))>-1){
									if(['0' , '1' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9'].indexOf(token)>-1){
										if(!nextIsValue)
											if(text.charAt(i+1)!==':')
												captureError('Cannot have variable as key.');
										token += '</span>';
										nextIsValue = (iterable[iterable.length-1]==='array');
										if(['[' , ':' , ',' , ' ', '\n'].indexOf(text.charAt(i-1))>-1){
											token = '<span style="color:' + colors.number + '">' + token;
											break;
										}
										break;
									}
									if(token==='e')
										if(text.substring(i-4,i+1)==='false'){
											token += '</span>';
											nextIsValue = (iterable[iterable.length-1]==='array');
											break;
										}
										else
										if(text.substring(i-3,i+1)==='true'){
											token += '</span>';
											nextIsValue = (iterable[iterable.length-1]==='array');
											break;
										}
									if(token==='d')
										if(text.substring(i-8,i+1)==='undefined'){
											token += '</span>';
											nextIsValue = (iterable[iterable.length-1]==='array');
											break;
										}
									if(token==='l')
										if(text.substring(i-3,i+1)==='null'){
											token += '</span>';
											nextIsValue = (iterable[iterable.length-1]==='array');
											break;
										}
									captureError('Cannot have variable as ' + (nextIsValue ? 'value.' : 'key.'));
								}
						}
						if(nextIsValue){
							if(['[' , ':' , ',' , ' ', '\n'].indexOf(text.charAt(i-1))>-1){
								if(['9' , '8' , '7' , '6' , '5' , '4' , '3' , '2' , '1' , '0'].indexOf(token)>-1){
									token = '<span style="color:' + colors.number + '">' + token;
									break;
								}
								if(token==='f')
									if(text.substring(i,i+5)==='false'){
										token = '<span style="color:' + colors.primitive + '">' + token;
										break;
									}
								if(token==='t')
									if(text.substring(i,i+4)==='true'){
										token = '<span style="color:' + colors.primitive + '">' + token;
										break;
									}
								if(token==='n')
									if(text.substring(i,i+4)==='null'){
										token = '<span style="color:' + colors.primitive + '">' + token;
										break;
									}
								if(token==='u')
									if(text.substring(i,i+9)==='undefined'){
										token = '<span style="color:' + colors.primitive + '">' + token;
										break;
									}
								captureError('Cannot have variable as value.');
							}
						}
						else
						if(token==='.')
							captureError('Cannot have dots other than as part of a number value.');
						if(['{' , ',' , ' ','\n'].indexOf(text.charAt(i-1))>-1){
							if(['9' , '8' , '7' , '6' , '5' , '4' , '3' , '2' , '1' ,'0'].indexOf(token)>-1)
								captureError('Cannot have numbers at the start of a key.');
							token = '<span style="color:' + colors.keys + '">' + token;
							break;
						}
					}
					break;
			}
			result += token;
			if(i+1===charTotal)
				if(iterable.length!==0)
					captureError('Expected ' + iterable.length +  ' additional closing bracket' + (iterable.length > 1 ? 's.' : '.'));

		}

		return { markupText : result, error : error, lines : line + 1 };
	}
	update(){
		const
			textContent = this.rawTextContent(),
			spaceText   = this.formatSpacing(textContent);
		let { markupText, error, lines } = this.formatColors(spaceText);
		let
			//jsonText = undefined,
			jsObject = undefined;
		//try { jsonText = this.addDoubleQuotes(textContent); } catch(e) { }
		//try { jsObject = JSON.parse(jsonText); } catch(e) { }

		try {
			jsObject = JSON.parse(textContent);
		}
		catch (e) {
			if(!error.token) {
				error = {
					charPosition_absolute: 0,
					charPosition_relative: 0,
					line: 0,
					token: 2,
					reason: e.message
				}
			}
		}
		this.setState({
			...this.state,
			plainText  : spaceText,
			markupText : markupText,
			jsonText   : textContent,//jsonText,
			jsObject   : jsObject,
			lines      : lines,
			error      : error
		});
		this.props.returning(jsObject);
	}
	onClick(){ this.state = { ...this.state, focused : true }; }
	onBlur(){
		this.props.setIsFocused(false);
		if(this.state.focused) this.update();
	}
	onScroll(event){
		var labels = document.getElementById('ared7_jsonviewer_labels' + this.props.id);
		labels.scrollTop = event.target.scrollTop;
	}
	componentDidUpdate(){
		this.showPlaceholder();
		function createRange(node, chars, range) {
			if (!range) {
				range = document.createRange();
				range.selectNode(node);
				range.setStart(node, 0);
			}
			if (chars.count === 0) {
				range.setEnd(node, chars.count);
			} else if (node && chars.count >0) {
				if (node.nodeType === Node.TEXT_NODE) {
					if (node.textContent.length < chars.count) chars.count -= node.textContent.length;
					else { range.setEnd(node, chars.count); chars.count = 0; }
				} else
					for (var lp = 0; lp < node.childNodes.length; lp++) {
						range = createRange(node.childNodes[lp], chars, range);
						if (chars.count === 0) break;
					}
			}
			return range;
		};
		function setCurrentCursorPosition(chars) {
			if (chars >= 0) {
				var selection = window.getSelection();
				var range = createRange(document.getElementById('ared7_jsonviewer_body' + this.props.id).parentNode, { count: chars });
				if (range) {
					range.collapse(false);
					selection.removeAllRanges();
					selection.addRange(range);
				}
			}
		};
		function isChildOf(node, parentId) {
			while (node !== null) {
				if (node.id === parentId) return true;
				node = node.parentNode;
			}
			return false;
		};
		function getCurrentCursorPosition(parentId) {
			var
				selection = window.getSelection(),
				charCount = -1,
				node;
			if (selection.focusNode)
				if (isChildOf(selection.focusNode, parentId)) {
					node = selection.focusNode;
					charCount = selection.focusOffset;
					while (node) {
						if (node.id === parentId) break;
						if (node.previousSibling) {
							node = node.previousSibling;
							charCount += node.textContent.length;
						} else {
							node = node.parentNode;
							if (node === null) break;
						}
					}
				}
			return charCount;
		};
	}
	componentDidMount(){
		document.getElementById('ared7_jsonviewer_body' + this.props.id).addEventListener('paste', e => {
			e.preventDefault();
			var text = e.clipboardData.getData('text/plain');
			document.execCommand('insertHTML', false, text);
		});
		this.showPlaceholder();
	}
	showPlaceholder(){
		const { preText } = this.state;
		const _markupText = this.state.markupText;
		if(!('placeholder' in this.props))  return;
		const { placeholder } = this.props;
		if(preText===placeholder) return;
		if(typeof placeholder !== 'object') return console.error('placeholder in props is not an object:',placeholder);
		let
			jsonText          = JSON.stringify(placeholder),
			// noExtraQuotesText = this.removeQuotes(jsonText),
			// singleQuotesText  = this.reduceDoubleQuotes(noExtraQuotesText),
			spaceText         = this.formatSpacing(jsonText);//this.formatSpacing(singleQuotesText);

		const { markupText, error, lines } = this.formatColors(spaceText);
		this.setState({
			...this.state,
			preText    : placeholder,
			plainText  : spaceText,
			markupText : markupText,
			lines      : lines,
			error      : error
		});
	}
	removeQuotes(jsonText){
		let
			prettyText = '',
			token      = '',
			isValue    = false,
			stringOpen = false,
			brackets   = [],
			ignore     = false;
		for(var i = 0; i < jsonText.length; i++){
			token = jsonText.charAt(i);
			switch(token){
				case ':': isValue = true; break;
				case ',':
					isValue = (brackets[brackets.length-1] === 'array');
					break;
				case '{':
					brackets.push('object');
					isValue = (brackets[brackets.length-1] === 'array');
					break;
				case '}':
					brackets.pop();
					isValue = (brackets[brackets.length-1] === 'array');
					break;
				case '[':
					brackets.push('array');
					isValue = (brackets[brackets.length-1] === 'array');
					break;
				case ']':
					brackets.pop();
					isValue = (brackets[brackets.length-1] === 'array');
					break;
				case '\\':
					if(stringOpen){
						token = jsonText.charAt(i+1);
						i++;
					}
					break;
				case '"': case "'":
				if(!stringOpen){
					if(!isValue){
						var
							nextQuote  = jsonText.indexOf(token,i+1),
							quotedWord = jsonText.substring(i+1,nextQuote),
							hasSpace   = quotedWord.indexOf(' ') > -1;
						if(!hasSpace){
							stringOpen = token;
							token = '';
							break;
						}
						ignore = nextQuote;
					}
					stringOpen = token;
					break;
				}
				if(!isValue)
					if(i!==ignore)
						if(stringOpen===token) token = ''; else ignore = false;
				break;
				default: break;
			}
			prettyText += token;
		}
		return prettyText;
	}
	reduceDoubleQuotes(text){
		let
			token   = '',
			start   = 0,
			frag    = '',
			newText = '';
		function isMarker(token){ return (['{','[',']','}',':',','].indexOf(token) > -1); }
		function hasDoubleQuotes(text){ return text.charAt(0) === '"'; }
		function hasSingleQuotes(text){ return text.charAt(0) === "'"; }
		function trimQuotes(text){      return text.slice(1, -1);      }
		function addQuotes(text,quote){ return quote + text + quote;   }
		function hasContent(text){      return text.length > 0;        }
		for(var i = 0; i < text.length; i++){
			token = text.charAt(i);
			if(isMarker(token)){
				frag = text.substring(start,i);
				if(hasContent(frag))
					if(hasDoubleQuotes(frag)){
						var
							noQuotes     = trimQuotes(frag),
							singleQuotes = (noQuotes.match(/'/g) || []).length,
							doubleQuotes = (noQuotes.match(/"/g) || []).length;
						if(singleQuotes===0){
							var withQuotes = addQuotes(noQuotes,"'");
							newText = newText.slice(0,- withQuotes.length);
							newText += withQuotes;
						}
					}
				start = i + 1;
			}
			newText += token;
		}
		return newText;
	}
	addDoubleQuotes(text){
		let
			token    = '',
			start    = 0,
			frag     = '',
			isValue  = false,
			brackets = [],
			newText  = '';
		function isMarker(token){ return (['{','[',']','}',':',','].indexOf(token) > -1); }
		function hasDoubleQuotes(text){ return text.charAt(0) === '"'; }
		function hasSingleQuotes(text){ return text.charAt(0) === "'"; }
		function trimQuotes(text){      return text.slice(1, -1);      }
		function addQuotes(text,quote){ return quote + text + quote;   }
		function hasContent(text){      return text.length > 0;        }
		function isNumerical(text){     return ['0','1','2','3','4','5','6','7','8','9'].indexOf(text.charAt(0)) > -1; }
		for(var i = 0; i < text.length; i++){
			token = text.charAt(i);
			if(isMarker(token)){
				frag = text.substring(start,i);
				if(hasContent(frag)){
					if(!isValue)
						if(!hasDoubleQuotes(frag)){
							var length = frag.length;
							if(hasSingleQuotes(frag)) frag = trimQuotes(frag);
							frag = addQuotes(frag,'"');
							newText = newText.slice(0,- length);
							newText += frag;
						}
					if(isValue)
						if(!isNumerical(frag))
							if('null'      !== frag)
								if('undefined' !== frag)
									if('true'      !== frag)
										if('false'     !== frag)
											if(!hasDoubleQuotes(frag)){
												var length = frag.length;
												if(hasSingleQuotes(frag)) frag = trimQuotes(frag);
												frag = addQuotes(frag,'"');
												newText = newText.slice(0,- length);
												newText += frag;
											}
				}
				start = i + 1;
			}
			switch(token){
				case ':':                          isValue = true;                                      break;
				case ',':                          isValue = (brackets[brackets.length-1] === 'array'); break;
				case '{': brackets.push('object'); isValue = (brackets[brackets.length-1] === 'array'); break;
				case '}': brackets.pop();          isValue = (brackets[brackets.length-1] === 'array'); break;
				case '[': brackets.push('array');  isValue = (brackets[brackets.length-1] === 'array'); break;
				case ']': brackets.pop();          isValue = (brackets[brackets.length-1] === 'array'); break;
			}
			newText += token;
		}
		return newText;
	}
}

export default JSONInput;
