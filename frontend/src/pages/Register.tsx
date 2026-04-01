import Form from "../components/AuthForm"

function Register() {
    return <Form route={`${import.meta.env.VITE_API_URL}/api/users/register`} method="register" />
}

export default Register