import React, {useState} from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const TicketForm = ({create}) => {

	const [ticket, setTicket] = useState({name:'', description:''})

	const addNewTicket = (e) => {
    	e.preventDefault();
    	const newTicket = {
    		...ticket, id: Date.now()
    	}
    	create(newTicket)
    	setTicket({name:'', description:''})
	}

	return(
		<div>
	      <Modal.Header closeButton>
	        <Modal.Title>Comment Create</Modal.Title>
	      </Modal.Header>

	      <Modal.Body>
	        <Form.Group >
	          <Form.Label>Ticket Name</Form.Label>
	          <Form.Control 
		          value={ticket.name}
		          onChange={ e => setTicket({...ticket, name:e.target.value})}
		          type="text" 
		          placeholder="Enter the Ticket Name"
		      />
	          <Form.Label>Ticket description</Form.Label>
	          <Form.Control 
		          value={ticket.description}
		          onChange={ e => setTicket({...ticket, description:e.target.value})}
		          type="text" 
		          placeholder="Short Ticket description"
	          /> 
	        </Form.Group>
	      </Modal.Body>

	      <Modal.Footer>
	        <Button onClick={addNewTicket}>Ok</Button>
	      </Modal.Footer>
		</div>
	)
}

export default TicketForm

