import React, {useState, useMemo, useEffect, useRef} from 'react'
import Counter from '../components/Counter'
import TicketList from '../components/TicketList'
import TicketForm from '../components/TicketForm'
import MySelect from '../components/UI/select/MySelect'
import MyButton from '../components/UI/button/MyButton'
import MyModal from '../components/UI/modal/MyModal'
import TicketFilter from '../components/TicketFilter'
import {useTickets} from '../hooks/useTickets'
import {useFetching} from '../hooks/useFetching'
import TicketService from '../API/TicketService'
import Loader from '../components/UI/loader/Loader'
import Pagination from '../components/UI/pagination/Pagination'
import {getPageCount, getPagesArray} from '../utils/pages'
import '../styles/App.css'
import {useObserver} from '../hooks/useObserver'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'


import Modal from 'react-bootstrap/Modal';

function Tickets() {
  const [tickets, setTickets] = useState([])
  const [filter, setFilter] = useState({sort:'', query:''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedTickets = useTickets(tickets, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const lastElement = useRef()

  const [fetchTickets, isTicketsLoading, ticketError] = useFetching( async () => {
      const response = await TicketService.getAll(limit, page)
      setTickets([...tickets, ...response.data])
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isTicketsLoading, () => {
    setPage(page +1)
  })

  const createTicket = async (newTicket) => {
    const response = await TicketService.postTicket(newTicket)
    setTickets([...tickets, newTicket])
    setModal(false)
  }

  const removeTicket = async (ticket) => {
    const response = await TicketService.deleteTicket(ticket.ticket_id)
    setTickets(tickets.filter(p => p.ticket_id != ticket.ticket_id))
  }

  useEffect( () => {
    fetchTickets()
  }, [page, limit])

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <h2 style={{marginTop: 30}}> 
        Tickets List 
      </h2>

      <Button style={{marginTop: 30}} onClick={() => setModal(true)}>
        Create Ticket
      </Button>


      <Modal 
        show={modal} 
        onHide={setModal}
        size="lg"
      >
        <TicketForm create={createTicket}/>
      </Modal>

      <hr style={{ margin: '15px 0'}}/>

      <Row className="mb-3">
        
        <Form.Group as={Col} sm={8}>
          <Form.Control 
            type="email" 
            value={filter.query}
            onChange={e => setFilter({...filter, query: e.target.value})}
            placeholder="Search" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Select
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue="Sort"
          >
            <option value='title'>By name</option>
            <option value='body'>By description</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Select
            value={limit}
            onChange={value => setLimit(value)}
            defaultValue="Elements by page"
          >
            <option value='5'>5</option>
            <option value='15'>15</option>
            <option value='25'>25</option>
            <option value='-1'>All</option>
          </Form.Select>
        </Form.Group>

      </Row>

      {ticketError &&
        <h2>Loading Error</h2>
      }
      
      <TicketList remove={removeTicket} tickets={sortedAndSearchedTickets} title="Tickets List"/>
      <div ref={lastElement} />
      
      {isTicketsLoading &&
        <div style={{display:'flex', justifyContent:'center', marginTop: 50}}> <Loader /> </div>
      }
      
      <Pagination 
        page={page}  
        changePage={changePage}
        totalPages={totalPages}
       />
    </div>
  );
}

export default Tickets;
