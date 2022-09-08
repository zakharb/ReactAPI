import React, {useState} from 'react'
import CommentItem from './CommentItem'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CommentList = function ({comments, title, remove, setModal, setCurrentComm, currentComm}) {

	if(!comments.length){
		return(
	      <h1 style={{textAlign: 'center'}}> 
	        Comments not found 
	      </h1>
		)
	}

	return(

		<div>
	      		{comments.map(comment =>
				    <Container key={comment.comment_id}>
				      <Row>
				        <Col md={12}>
				          <CommentItem remove={remove} comment={comment} setModal={setModal} setCurrentComm={setCurrentComm} currentComm={currentComm}/>
				        </Col>
				      </Row>
					</Container>
	      		)}
      </div>

	)
}

export default CommentList

