import React, {useState, useMemo} from 'react'
import MySelect from './UI/select/MySelect'
import MyInput from './UI/input/MyInput'
import Form from 'react-bootstrap/Form';

const TicketFilter = function ({filter, setFilter}) {
	return(
      <div>
        <Form.Control 
          type="email" 
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
          placeholder="Search" />


        <Form.Select
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue="Sort"
        >
          <option value='title'>By name</option>
          <option value='body'>By description</option>
        </Form.Select>
      </div>
	)
}

export default TicketFilter
