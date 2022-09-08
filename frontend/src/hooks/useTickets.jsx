import React, {useMemo} from 'react'

export const useSortedTicket = (tickets, sort) => {

  const sortedTickets = useMemo(() => {
    if(sort) {
      return [...tickets].sort((a,b) => a[sort].localeCompare(b[sort]))
    }
    return tickets;
  }, [sort, tickets])

  return sortedTickets
}

export const useTickets = (tickets, sort, query) => {

  const sortedTickets = useSortedTicket(tickets, sort)

  const sortedAndSearchedTickets = useMemo(() => {
    return sortedTickets.filter(ticket => ticket.name.toLowerCase().includes(query.toLowerCase()))
  }, [query, sortedTickets])

  return sortedAndSearchedTickets
}