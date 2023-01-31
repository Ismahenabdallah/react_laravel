import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProducts() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        'title': '',
        'description': '',
        'image': '',
    });
    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };
    const [image, setImage] = useState('')
    const onchangeHandler = (e) => {
        setImage(e.target.files[0])
    }


    const onChangeHandlerForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title)
        formData.append('description', form.description)
        formData.append('image', image)

        await axios.post('http://127.0.0.1:8000/api/products', formData)
            .then((res) => {
                console.log(res.response)
                navigate('/')
                toast.success(res.response, toastOptions)

            })
            .catch((err) => {
                console.log(err.response.data.message)
                toast.error(err.response.data.message, toastOptions)

            });



    }
    return (
        <div className='container text-capitalize'>
            <div className='row justify-content-center  '>
                <div className='w-50 col-sm-12 col-md-12'>
                    <div className='card-body'>
                        <h3 className='card-title'> create form</h3>
                        <hr />
                        <div className='form-wrapper text-start block'>
                            <form onSubmit={onSubmit.bind(this)} encType='multipart/form-data'>
                                <div className="form-group mb-3 mt-3">
                                    <label >title</label>
                                    <input onChange={onChangeHandlerForm} value={form.title} type="text" name='title' className="form-control" placeholder="Enter tritle" />
                                </div>

                                <div className="form-group mb-3 mt-3">
                                    <label >description</label>
                                    <input onChange={onChangeHandlerForm} value={form.description} className="form-control" type="text" name='description' />
                                </div>
                                <div className="form-group mb-3 mt-3   ">
                                    <label>image</label>
                                    <input onChange={onchangeHandler} type="file" className="form-control" name='image' />
                                </div>
                                <div className="form-group mb-3 mt-3   ">
                                    <button className=' btn btn-primary py-2 px-3' > Submit</button>
                                </div>


                            </form>
                        </div>

                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
