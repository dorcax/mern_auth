import { useState,useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {useDispatch,useSelector} from "react-redux"
import { useLoginMutation } from "../Slices/userApiSlice";
import { setCredentials } from "../Slices/authSlice";
import {toast} from "react-toastify"
const Login = () => {
const navigate =useNavigate()
const dispatch =useDispatch()
// const selector =useSelector()
  const [data, setData] = useState({ email: "", password: "" });

  // handle change of value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const[login,{isLoading,error}] =useLoginMutation()
  const{userInfo} =useSelector((state)=>state.auth)

  useEffect(()=>{
if(userInfo){
  navigate("/")
}
  },[navigate,userInfo])
  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
       try {
        const res =await login({email:data.email,password:data.password}).unwrap()
        dispatch(setCredentials({...res}))
        navigate("/")
        toast.success("user logged in")

       } catch (err) {
        toast.error(err.data)
       }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            name="email"
            value={data.email}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter your password"
            name="password"
            value={data.password}

            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        {isLoading && <h2>loading---</h2>}
        <Button type="submit" variant="primary" className="mt-3">Sign In</Button>
        <Row className="py-3">
            <Col>
            New Customer ?<Link to="/register">Register</Link>
            </Col>

        </Row>
      </Form>
    </FormContainer>
    
  );
};

export default Login;
