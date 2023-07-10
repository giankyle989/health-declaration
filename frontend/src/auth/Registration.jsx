import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

const Register = () => {
    const emailRef = useRef()
    const firstnameRef = useRef()
    const lastnameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    const {setUser, setToken} = useStateContext()
    
    const onSubmit = (e) =>{
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            passowrd: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        axiosClient.post('/register', payload).then(({data}) =>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err =>{
            const response = err.response
            if (response && response.status === 422){
                console.log(response.data.errors)
            }
        })
    }
    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div>
                    <h1 className="text-lg font-bold text-center mb-4">
                        Register
                    </h1>
                    {/*Login Form */}
                    <div className="border p-4 shadow-xl rounded">
                        <form
                            className="p-4 gap-2 flex flex-col"
                            onSubmit={onSubmit}
                            action=""
                        >
                            <div className="flex flex-col">
                                <label htmlFor="Email">Email</label>
                                <input
                                ref={emailRef}
                                    className="w-full border border-black p-1.5 focus:outline-none focus:border-sky-300 rounded"
                                    name="Email"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="firstname">First Name</label>
                                <input
                                ref={firstnameRef}
                                    className="w-full border border-black p-1.5 focus:outline-none focus:border-sky-300 rounded"
                                    name="firstname"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="lastname">Last Name</label>
                                <input
                                ref={lastnameRef}
                                    className="w-full border border-black p-1.5 focus:outline-none focus:border-sky-300 rounded"
                                    name="lastname"
                                    type="text"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="Password">Password</label>
                                <input
                                ref={passwordRef}
                                    className="w-full border border-black p-1.5 focus:outline-none focus:border-sky-300 rounded"
                                    name="Password"
                                    type="password"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="Password">Confirm Password</label>
                                <input
                                ref={passwordConfirmationRef}
                                    className="w-full border border-black p-1.5 focus:outline-none focus:border-sky-300 rounded"
                                    name="Password"
                                    type="password"
                                />
                            </div>
                            <button className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-2 px-4 border-b-4 border-sky-700 hover:border-sky-500 rounded my-2">
                                Create account
                            </button>
                            <p>
                                Already have an account? Login
                                <Link
                                    className="text-sky-400 hover:text-sky-300"
                                    to={"/login"}
                                >
                                    {" "}
                                    here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;