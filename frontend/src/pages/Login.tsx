import Form from "../components/AuthForm"

function Login() {
    return <Form route={`${import.meta.env.VITE_API_URL}/api/users/token`} method="login" />
}

export default Login