import React from 'react'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useFetching} from '../hooks/useFetching'
import TicketService from '../API/TicketService'
import Loader from '../components/UI/loader/Loader'
import MyButton from '../components/UI/button/MyButton'
import CommentList from '../components/CommentList'
import {useComments} from '../hooks/useComments'
import MyModal from '../components/UI/modal/MyModal'
import CommForm from '../components/CommForm'
import CommEditForm from '../components/CommEditForm'
import Modal from 'react-bootstrap/Modal';


import Button from 'react-bootstrap/Button';

const TicketIdPage = () => {
  const params = useParams()
  const [ticket, setTicket] = useState({})
  const [comms, setComms] = useState([])
  const [currentComm, setCurrentComm] = useState({title:'2', body:'1'})

  const [filter, setFilter] = useState({sort:'', query:''})

  const [modal, setModal] = useState(false)
  const [modal2, setModal2] = useState(false)

  
  const [fetchTicketById, isLoading, error] =  useFetching ( async (id) => {
    const response = await TicketService.getById(params.id)
    console.log(123123)
    console.log(params.id)
    setTicket(response.data)
  })
  
  const [fetchComms, isComLoading, comError] =  useFetching ( async (id) => {
    const response = await TicketService.getTicketComments(params.id)
    setComms(response.data)
  })

  const sortedAndSearchedComments = useComments(comms, filter.sort, filter.query)

  const createComm = async (newComm, ticket_id) => {
    console.log(ticket_id)
    const response = await TicketService.postComment(newComm, ticket_id)
    setComms([...comms, newComm])
    setModal(false)
  }

  const editComm = async (comm) => {
    const response = await TicketService.putComment(comm)
    let newComms = [...comms];
    newComms[comm.id - 1] = comm;
    setComms(newComms)
    setModal2(false)
  }

  const removeComm = async (comm) => {
    const response = await TicketService.deleteComment(comm.comment_id)
    setComms(comms.filter(p => p.comment_id != comm.comment_id))
  }

  useEffect( () => {
    fetchTicketById(params.id)
    fetchComms(params.id)
  }, [])
  
  console.log(ticket.name)
  return (
    <div className="App">
      <h2 style={{marginTop: 30}}> 
        Ticket page
      </h2>

      {isLoading
        ? <Loader/>
        : <div> {ticket.name} </div>
      }

      <Button style={{marginTop: 30}} onClick={() => setModal(true)}>
        Create Comment
      </Button>

      <Modal 
        show={modal} 
        onHide={setModal}
        size="lg"
      >
        <CommForm create={createComm} ticket_id={ticket.ticket_id}/>
      </Modal>

      <Modal 
        show={modal2} 
        onHide={setModal2}
        size="lg"
      >
        <CommEditForm edit={editComm} currentComm={currentComm} setCurrentComm={setCurrentComm}/>
      </Modal>

      {isComLoading
        ? <Loader/>
        : <div style={{marginTop:15}}> 
      <CommentList 
        remove={removeComm} 
        comments={sortedAndSearchedComments} 
        title="Comments List" 
        setModal={setModal2} 
        setCurrentComm={setCurrentComm} 
        currentComm={currentComm}/>
          </div>
      }
    </div>
  );
}

export default TicketIdPage;
