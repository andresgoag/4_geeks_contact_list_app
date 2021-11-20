const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: [],
			URL_API: "https://3000-teal-mite-5r8l98ea.ws-us18.gitpod.io"
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()

			getContacts: () => {
				fetch(`${getStore().URL_API}/contact/all`)
					.then(response => {
						if (response.ok) {
							return response.json();
						} else {
							return new Error("Error fetching the api");
						}
					})
					.then(data => setStore({ contacts: data }))
					.catch(error => console.error(error));
			},

			addContact: contact => {
				fetch(`${getStore().URL_API}/contact`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contact)
				})
					.then(response => {
						if (response.ok) {
							fetch(`${getStore().URL_API}/contact/all`)
								.then(response => {
									if (response.ok) {
										return response.json();
									} else {
										return new Error("Error fetching the api");
									}
								})
								.then(data => setStore({ contacts: data }))
								.catch(error => console.error(error));
						}
					})
					.catch(error => console.error("Error:", error));
			},

			deleteContact: contactId => {
				fetch(`${getStore().URL_API}/contact/${contactId}`, { method: "DELETE" })
					.then(response => {
						if (response.ok) {
							fetch(`${getStore().URL_API}/contact/all`)
								.then(response => {
									if (response.ok) {
										return response.json();
									} else {
										return new Error("Error fetching the api");
									}
								})
								.then(data => setStore({ contacts: data }))
								.catch(error => console.error(error));
						}
					})
					.catch(error => console.error(error));
			},

			editContact: contact => {
				fetch(`${getStore().URL_API}/contact/${contact.id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contact)
				})
					.then(response => {
						if (response.ok) {
							fetch(`${getStore().URL_API}/contact/all`)
								.then(response => {
									if (response.ok) {
										return response.json();
									} else {
										return new Error("Error fetching the api");
									}
								})
								.then(data => setStore({ contacts: data }))
								.catch(error => console.error(error));
						}
					})
					.catch(error => console.error("Error:", error));
			}
		}
	};
};

export default getState;
