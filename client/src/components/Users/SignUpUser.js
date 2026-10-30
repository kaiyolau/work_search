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
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    // Turn the API's validation error into messages a person can act on.
    const describeError = (e) => {
        const data = e && e.response && e.response.data;
        if (!data) return ['Could not reach the server. Please try again in a moment.'];
        if (data.code === 11000) return ['That email address is already registered. Try signing in instead.'];
        if (data.errors) {
            return Object.values(data.errors).map((err) => {
                const msg = err.message || '';
                if (msg.includes('shorter than the minimum')) return 'Password must be at least 7 characters.';
                if (msg.includes('cannot contain "password"')) return 'Password cannot contain the word "password".';
                if (msg.includes('Path `name` is required')) return 'Please enter your name.';
                if (msg.includes('Path `email` is required')) return 'Please enter your email address.';
                if (msg.includes('Path `password` is required')) return 'Please enter a password.';
                return msg;
            });
        }
        return [data.message || 'Sign up failed. Please check your details.'];
    };


    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = () => {
        const { name, email, password } = user;
        setErrors([]);

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
            setErrors(describeError(e));
        });

    };


    return (
        <div className="submit-form">
            {errors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {errors.map((msg, i) => (
                        <div key={i}>{msg}</div>
                    ))}
                </div>
            )}
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
                type="password"
                className="form-control"
                id="password"
                required
                autoComplete="new-password"
                value={user.password}
                onChange={handleInputChange}
                name="password"
                />
                <small className="form-text text-muted">
                    At least 7 characters, and it cannot contain the word "password".
                </small>
            </div>

            <button onClick={saveUser} className="btn btn-success">
                Sign Up
            </button>
        </div>
    );
};

export default AddUser;
