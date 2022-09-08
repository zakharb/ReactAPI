import  React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import MyButton from './UI/button/MyButton'
import { useNavigate } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";

const TicketItem = function (props) {
	const navigate = useNavigate();
	return(
	  	<div>
		    <Container className="p-3">
		      <Row>
		        <Col md={10}>
						<strong>{props.ticket.name}</strong>
						<p>{props.ticket.description}</p>
		        </Col>
		        <Col md={2} className="px-3">
		        
			    	  	<Button className="border-0" variant="outline-primary" onClick={() => navigate(`${props.ticket.ticket_id}/comments`)}>
			    	  		<BiCommentDetail />
			    	  	</Button>
			    	  	<Button className="border-0" variant="outline-primary" onClick={() => navigate(`${props.ticket.ticket_id}`)}>
			    	  		<FaEdit />
			    	  	</Button>
			    	  	<Button className="border-0" variant="outline-secondary" onClick={() => props.remove(props.ticket)}>
			    	  		<FaTrashAlt />
			    	  	</Button>

		        </Col>
		      </Row>
			</Container>
		</div>
	)
}


export default TicketItem
