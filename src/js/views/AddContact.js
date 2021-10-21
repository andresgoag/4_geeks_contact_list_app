import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { agenda_slug } from "../store/flux";
import { Context } from "../store/appContext";

export const AddContact = props => {
	const [fullName, setFullName] = React.useState(props.fullName);
	const [email, setEmail] = React.useState(props.email);
	const [phone, setPhone] = React.useState(props.phone);
	const [address, setAddress] = React.useState(props.address);

	const { actions } = React.useContext(Context);

	const saveAction = () => {
		const contact = {
			agenda_slug: agenda_slug,
			full_name: fullName,
			email: email,
			phone: phone,
			address: address
		};

		actions.addContact(contact);
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							onChange={e => setFullName(e.target.value)}
							value={fullName}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							onChange={e => setPhone(e.target.value)}
							value={phone}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							onChange={e => setAddress(e.target.value)}
							value={address}
						/>
					</div>

					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => {
							saveAction();
							props.history.push("/");
						}}>
						save
					</button>

					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

AddContact.propTypes = {
	fullName: PropTypes.string,
	email: PropTypes.string,
	phone: PropTypes.string,
	address: PropTypes.string,
	history: PropTypes.object
};

AddContact.defaultProps = {
	fullName: "",
	email: "",
	phone: "",
	address: ""
};
