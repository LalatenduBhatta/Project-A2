import React, { useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom"

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const handelChange = (e) => {
        let name = e.target.name;
        let value = e.target.value.trim()
        setUserData({ ...userData, [name]: value })
    }
    const handelSubmit = (e) => {
        e.preventDefault()
        if (userData.email && userData.password) {
            axios.post("http://localhost:4000/user/login", userData)
                .then(res => console.log(res))
                .catch(error => console.log(error))
        } else {
            alert("Provide all fields")
        }
    }
    return (
        <main className='w-full h-screen flex justify-center items-center' id="auth">
            <div className="sm:w-[350px] md:w-[400px] lg:w-[450px] p-4 bg-blue-300 border border-gray-200 rounded-lg shadow 
            sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50">
                <form className="space-y-6" onSubmit={handelSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 
                        dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required
                            onChange={handelChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border 
                        border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 
                        dark:text-white" required onChange={handelChange} />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 
                                rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600
                                 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                    dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login