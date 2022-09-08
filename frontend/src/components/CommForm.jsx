import React, {useState} from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CommentForm = ({create, ticket_id}) => {

	const [comment, setComment] = useState({user:'', value:''})

	const addNewComment = (e) => {
    	e.preventDefault();
    	const newComment = {
    		...comment, comment_id: Date.now()
    	}
    	console.log(ticket_id)
    	create(newComment, ticket_id)
    	setComment({user:'', value:''})
	}

	return(
		<div>
	      <Modal.Header closeButton>
	        <Modal.Title>Comment Create</Modal.Title>
	      </Modal.Header>

	      <Modal.Body>
	        <Form.Group >
	          <Form.Label>User name</Form.Label>
	          <Form.Control 
		          value={comment.user}
		          onChange={ e => setComment({...comment, user:e.target.value})}
		          type="text" 
		          placeholder="Enter User Name"
		      />
	          <Form.Label>Comment</Form.Label>
	          <Form.Control 
		          value={comment.value}
		          onChange={ e => setComment({...comment, value:e.target.value})}
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

