import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import Modal from 'react-bootstrap/Modal';

const CommentForm = ({edit, currentComm, setCurrentComm}) => {

	const addNewComment = (e) => {
    	e.preventDefault();
    	edit(currentComm)
	}

	return(
		<div>
		      <Modal.Header closeButton>
		        <Modal.Title>Comment Edit</Modal.Title>
		      </Modal.Header>

		      <Modal.Body>
		        <Form.Group className="mb-3">
		          <Form.Label>User name</Form.Label>
		          <Form.Control 
			          value={currentComm.user}
			          onChange={ e => setCurrentComm({...currentComm, user:e.target.value})}
			          type="text" 
			          placeholder="User name"
			      />
		          <Form.Label>Comment</Form.Label>
		          <Form.Control 
			          value={currentComm.value}
			          onChange={ e => setCurrentComm({...currentComm, value:e.target.value})}
			          type="text" 
			          placeholder="Comment"
		          /> 
		        </Form.Group>
		      </Modal.Body>

		      <Modal.Footer>
		        <Button onClick={addNewComment}>Ok</Button>
		      </Modal.Footer>
		</div>

	)
}

export default CommentForm

