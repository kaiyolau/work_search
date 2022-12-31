import React, { useState } from 'react';
import { useDispatch  } from "react-redux";
import { loginUser } from "../../actions/users";
import { Form, Button } from 'react-bootstrap';

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
                    onSignIn(response.user)
                    props.history.push('/')
                }
            })
    }

    return(
        <Form onSubmit={handleSubmit}>
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
                <Form.Control type="email" placeholder="Enter email"  name="email" onChange={event => {
                        setEmail(event.currentTarget.value)}}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label >Password</Form.Label>
                <Form.Control  type="password" name="password" onChange={event => {
                        setPassword(event.currentTarget.value)}} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
            Sign In
            </Button>
        </Form>


    )
}

export default SignInUser;
