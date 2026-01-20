import Form from "../components/AuthForm"

function Register() {
    return <Form route="http://localhost:8000/api/users/register" method="register" />
}

export default Register