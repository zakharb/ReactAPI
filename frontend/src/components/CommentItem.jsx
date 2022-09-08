import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";



const CommentItem = function (props) {
	const navigate = useNavigate();

    const openModal = () => {
	  props.setCurrentComm(props.comment);
      props.setModal(true)
  	}

	return(

	  	<div>
		    <Container className="p-3">
		      <Row>
		        <Col md={10}>
		  			<strong>{props.comment.user}</strong>
		  			<div>
		  				{props.comment.value}
		  			</div>
		        </Col>
		        <Col md={2} className="px-3">
		        
			    	  	<Button className="border-0" variant="outline-primary" onClick={() => openModal()}>
			    	  		<FaEdit />
			    	  	</Button>
			    	  	<Button className="border-0" variant="outline-secondary" onClick={() => props.remove(props.comment)}>
			    	  		<FaTrashAlt />
			    	  	</Button>

		        </Col>
		      </Row>
			</Container>
		</div>

	)
}


export default CommentItem
