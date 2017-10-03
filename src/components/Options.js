import React from 'react';
import Option from './Option';

const Options = (props) => {
	return (
		<div>
			<div className='widget-header'>
				<h3 className='widget-haeder__title'>Your Options</h3>
				<button 
					onClick={props.handleDeleteOptions} 
					disabled={!props.options.length > 0} 
					className="button--link"
				>
						Remove all
				</button>
			</div>
			
			{props.options.length === 0 && <p className='widget__message'>Please add an option to get started</p>}
			{props.options.map((option, index) => (
				<Option key={index} count={index+1} handleDeleteOption={props.handleDeleteOption} option={option} />
			))}
		</div>
	);	
}

export default Options;