const URL_API = "https://assets.breatheco.de/apis/fake/contact";
export const agenda_slug = "andresgoag";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()

			getContacts: () => {
				fetch(`${URL_API}/agenda/${agenda_slug}`)
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
				fetch(`${URL_API}/`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contact)
				})
					.then(response => response.json())
					.then(data => console.log("Success:", data))
					.catch(error => console.error("Error:", error));
			},

			deleteContact: contactId => {
				fetch(`${URL_API}/${contactId}`, { method: "DELETE" });
			},

			editContact: contact => {
				fetch(`${URL_API}/${contact.id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contact)
				})
					.then(response => response.json())
					.then(data => console.log("Success:", data))
					.catch(error => console.error("Error:", error));
			}
		}
	};
};

export default getState;
