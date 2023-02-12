
import axios from 'axios';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

export default function Register() {




    const [form, setForm] = useState({
        email: '', password: "", name: "", confirm: ''
    })
    const [err, setErr] = useState()

    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const register = async (form) => {
        await axios.post('http://127.0.0.1:8000/api/auth/register', form).then((res) => {
            console.log(res.data)
            navigate('/login')

        }).catch((err) => {
            console.log(err.response.data)
            setErr(err.response.data.message)
        })

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await register(form)




    }


    return (





        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid"
                            alt="Sampl" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                        <p>{err ? err : ""}</p>
                        <form className=' mt-5' onSubmit={onSubmit}>





                            <div className="form-outline mb-4">

                                <input name='email' onChange={onChangeHandler} type="email" className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" />
                            </div>
                            <div className="form-outline mb-4">

                                <input name='name' onChange={onChangeHandler} type="text" className="form-control form-control-lg"
                                    placeholder="Enter your name " />
                            </div>


                            <div className="form-outline mb-3">

                                <input name='password' onChange={onChangeHandler} type="password" className="form-control form-control-lg"
                                    placeholder="Enter password" />
                            </div>
                            <div className="form-outline mb-3">

                                <input name='confirm' onChange={onChangeHandler} type="password" className="form-control form-control-lg"
                                    placeholder="Enter  confrim password" />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">

                                <div className="form-check mb-0">
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                    <input className="form-check-input me-2" type="checkbox" value="" />

                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                >Register</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/login"
                                    className="link-danger">Login</Link></p>

                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </section>


    );

}