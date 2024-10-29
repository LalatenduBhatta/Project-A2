import React, { useState } from 'react';
import { Link } from "react-router-dom"
import axios from "axios";
import { MdExitToApp } from "react-icons/md"

function Signup() {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value.trim() });
    };

    const validateForm = () => {
        const { email, mobile, password, confirmPassword } = userData;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return false;
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            alert("Mobile number should be 10 digits");
            return false;
        }

        if (password.length < 6) {
            alert("Password should be at least 6 characters");
            return false;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios.post("http://localhost:4000/user/signup", userData)
                .then(res => console.log(res))
                .catch(error => console.log(error));
        }
    };

    return (
        <main className='flex justify-center items-center' id="auth">
            <div className="sm:w-[350px] md:w-[400px] lg:w-[450px] p-4 bg-blue-300 border border-gray-200 rounded-lg shadow 
            sm:p-4 md:p-6 dark:bg-gray-800 dark:border-gray-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign up for our platform</h5>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 
                            dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 
                            dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                            <input type="date" name="dob" id="dob" className="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 
                            dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                            <select name="gender" id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 
                            dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                        <input type="text" name="mobile" id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 
                        dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 
                        dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 
                        dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 
                        dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} />
                    </div>

                    <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                    dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">Create Account</button>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account? <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                    </div>
                </form>
            </div>
            <div className="home-btn absolute top-4 left-4">
                <Link to={"/"}>
                    <button className="btn btn-xs sm:btn-sm md:btn-md text-white rounded-full">
                        <MdExitToApp className='text-lg' />Home
                    </button>
                </Link>
            </div>
        </main>
    );
}

export default Signup;
