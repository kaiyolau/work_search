import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/users";
import { createUser } from "../../actions/users";

const AddUser = (props) => {
    const { onSignIn } = props;
    const initialUserState = {
        id: null,
        name: '',
        email: '',
        password: ''
    };
    const [user, setUser] = useState(initialUserState);
    const dispatch = useDispatch();


    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = () => {
        const { name, email, password } = user;

        dispatch(createUser(name, email, password))
        .then(response => {
            setUser({
            id: response.id,
            name: response.name,
            email: response.email,
            password: response.password,
            });
            onSignIn(response.user)
            props.history.push('/')
        })
        .catch(e => {
            console.log(e);
        });

    };


    return (
        <div className="submit-form">
            <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input
                type="text"
                className="form-control"
                id="name"
                required
                value={user.name}
                onChange={handleInputChange}
                name="name"
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email address: </label>
                <input
                type="text"
                className="form-control"
                id="email"
                required
                value={user.email}
                onChange={handleInputChange}
                name="email"
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input
                type="text"
                className="form-control"
                id="password"
                required
                value={user.password}
                onChange={handleInputChange}
                name="password"
                />
            </div>

            <button onClick={saveUser} className="btn btn-success">
                Sign Up
            </button>
        </div>
    );
};

export default AddUser;
