import React from 'react';

import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal 
        isOpen={!!props.selectedOption}
        contentLabel="Select Option"
        onRequestClose={props.handleModalClose}
        closeTimeoutMS={200}
        className='modal'
    >
        <h3 className='modal__title' >Selected Option</h3>
        {props.selectedOption && <p className='modal__body' >{props.selectedOption}</p>}
        <button className='button' onClick={props.handleModalClose} >OK</button>
    </Modal>
);

export default OptionModal;