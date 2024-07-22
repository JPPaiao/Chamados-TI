/* eslint-disable react-refresh/only-export-components */
import { useState } from "react"
import { Form, useActionData, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { userAuth } from "../store/users/userSlice"

interface AuthLogin {
  auth: boolean,
  data: any
}

const action = async ({ request }) => {
  const formData = await request.formData()
  const [ username, password ]: string[] = [formData.get("username"), formData.get("password")]
  const body = {
    username: username,
    password: password
  }

  if (body.password && body.password) {
    const data = await fetch('http://localhost:3000/api/auth/login', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body) 
    })
    .then(res => res.json())

    if (data.token) {
      return  {
        auth: true,
        data: data
      }
    }
  }
  return {
    auth: false,
  } 
}

function Login() {
  const [loginInvalid, setLoginInvalid] = useState("")
  const actionData = useActionData() as AuthLogin
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (actionData && actionData.auth) {
    dispatch(
      userAuth({
        token: actionData.data.token,
        email: actionData.data.user.email,
        username: actionData.data.user.username,
        id: actionData.data.user.id
      })
    )

    navigate("/dashboard")
  }
  
  if (actionData && !actionData.auth && !loginInvalid) {
    setLoginInvalid("Login ou senha invalidos!")
  } 

  return (
    <div className="w-full h-screen flex gap-x-2 justify-center items-center">
      <div className="w-full h-screen  md:block hidden">
        <img src="https://images.pexels.com/photos/672460/pexels-photo-672460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full h-full object-cover"/>
        
      </div>
      <div className="flex justify-center items-center w-full py-5 px-7 sm:px-11">
        <div className="max-w-[500px] m-auto w-full bg-green-800 px-7 py-14">
          <Form method="post" className="flex flex-col gap-6 bg-white px-7 py-6 max-w-96 m-auto">
              {
                loginInvalid && <p className="text-red-600 text-lg font-semibold">{loginInvalid}</p>
              }
              <div className="text-2xl ">
                <h1>Atlantis</h1>
              </div>
              
              <input type="text" name="username" placeholder="Login" className="border-b-2 border-green-400 px-2 hover:border-green-800 transition-all duration-300 outline-none" />
              <input type="text" name="password" placeholder="Senha" className="border-b-2 border-green-400 px-2 hover:border-green-800 transition-all duration-300 outline-none" />
              <input type="submit" className="border-b-2 border-green-400 px-3 py-1 hover:border-green-800 transition-all duration-300 cursor-pointer outline-none" />
          </Form>
        </div>
      </div>
    </div>
  )
}

export { Login, action }