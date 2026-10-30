import React, { useState } from 'react';
import { useDispatch  } from "react-redux";
import { loginUser } from "../../actions/users";
import { Form, Button } from 'react-bootstrap';

// Shown only when the app is built with REACT_APP_SHOW_DEMO_HINT=true (the public demo).
const SHOW_DEMO_HINT = process.env.REACT_APP_SHOW_DEMO_HINT === 'true';
const DEMO_EMAIL = 'alice.demo@example.com';
const DEMO_PASSWORD = 'Demo1234!';

function SignInUser(props){
    const { onSignIn } = props;
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])



    function handleSubmit(event){
        event.preventDefault();

        dispatch(loginUser(email, password))
            .then(response => {
                if (!response) {
                    setErrors([...errors, {message: "Wrong email or password"}])
                } else if (response.user.id) {
                    onSignIn()
                    props.history.push('/')
                }
            })
    }

    return(
        <Form onSubmit={handleSubmit} className='submit-form'>
            {SHOW_DEMO_HINT && (
                <div className="alert alert-info" role="note">
                    <strong>Just looking around?</strong> Use the demo account:
                    <div>Email: <code>{DEMO_EMAIL}</code></div>
                    <div>Password: <code>{DEMO_PASSWORD}</code></div>
                    <Button
                        variant="outline-primary"
                        size="sm"
                        className="mt-2"
                        type="button"
                        onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); }}
                    >
                        Fill in demo account
                    </Button>
                </div>
            )}
            {errors.length > 0 ? (
                <Form.Group controlId="formBasicEmail">
                    <Form.Text className="text-muted">
                    Failed to Sign In.
                    </Form.Text>
                    <Form.Text className="text-muted">
                    {errors.map(error => error.message).join(", ")}
                    </Form.Text>
                </Form.Group>
            ) : (
                ''
            ) }

            <Form.Group controlId="formBasicEmail">
                <Form.Label >Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"  name="email" value={email} onChange={event => {
                        setEmail(event.currentTarget.value)}}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label >Password</Form.Label>
                <Form.Control  type="password" name="password" value={password} onChange={event => {
                        setPassword(event.currentTarget.value)}} placeholder="Password" />
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
            Sign In
            </Button>
        </Form>


    )
}

export default SignInUser;
