import axios from 'axios'

export default class TicketService {
	static async getAll(limit=10, page=1) {
		const response = await axios.get("http://localhost:8080/api/v1/tickets", {
		})
		return response
	}

	static async getById(id) {
		const response = await axios.get(`http://localhost:8080/api/v1/tickets/${id}`)
		return response
	}

	static async getTicketComments(id) {
		const response = await axios.get(`http://localhost:8080/api/v1/tickets/${id}/comments`)
		console.log(response.data)
		return response
	}

	static async postTicket(ticket) {
		const response = axios.post('/api/v1/tickets/', {
		    name: ticket.name,
		    description: ticket.description
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		return response
	}

	static async deleteTicket(id) {
		const response = axios.delete(`http://localhost:8080/api/v1/tickets/${id}`)
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		return response
	}
	
	static async postComment(comment, ticket_id) {
		const response = axios.post('http://localhost:8080/api/v1/comments/', {
		    user: comment.user,
		    value: comment.value,
		    ticket_id: ticket_id
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		return response
	}

	static async deleteComment(id) {
		const response = axios.delete(`http://localhost:8080/api/v1/comments/${id}`)
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		return response
	}

	static async putComment(comment) {
		const response = axios.put(`http://localhost:8080/api/v1/comments/${comment.comment_id}`, {
		    user: comment.user,
		    value: comment.value,
		    ticket_id: comment.ticket_id
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		return response
	}

}
