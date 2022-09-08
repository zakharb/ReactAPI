import React, {useState} from 'react'
import TicketItem from './TicketItem'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TicketList = function ({tickets, title, remove}) {

	if(!tickets.length){
		return(
	      <h2 style={{textAlign: 'center'}}> 
	        Tickets not found 
	      </h2>
		)
	}

	return(
		<div>
	      		{tickets.map(ticket =>
				    <Container key={ticket.ticket_id}>
				      <Row>
				        <Col md={12}>
				          <TicketItem remove={remove} ticket={ticket}/>
				        </Col>
				      </Row>
					</Container>
	      		)}
      </div>
	)
}

export default TicketList

