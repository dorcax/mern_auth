import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../Slices/userApiSlice";
import { useDispatch,useSelector } from "react-redux";
import { setCredentials } from "../Slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  // const [email,setEmail]=useState("")
  // const [password,setPassword] =useState("")

  const [data, setData] = useState({name:"", email: "", password: "",confirmPassword:"" });
 const [register] =useRegisterMutation()
 const dispatch =useDispatch()
 const navigate =useNavigate()
 const {userInfo } =useSelector((state)=>state.auth)

 useEffect(()=>{
if(userInfo){
  navigate("/")
}
 },[userInfo,navigate])
  // handle change of value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if(data.password !== data.confirmPassword){
      toast.error("password do not match")
    }else{
   try {
    const res =await register({name:data.name,email:data.email,password:data.password}).unwrap()
    dispatch(setCredentials(res))
    toast.success("user registered")
    navigate("/login")
   } catch (error) {
    console.log(error)
    toast.error(error.data)
    
   }
  }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="enter your name"
            name="name"
            value={data.name}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>ConfirmPassword</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter your confirm password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">Sign Up</Button>
        <Row className="py-3">
            <Col>
        Already have an account?<Link to="/login">Sign In</Link>
            </Col>

        </Row>
      </Form>
    </FormContainer>
    
  );
};

export default Register;
