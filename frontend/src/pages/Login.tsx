import Form from "../components/AuthForm"

function Login() {
    return <Form route="http://localhost:8000/users/token" method="login" />
}

export default Login