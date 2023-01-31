
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
export default function ListProducts() {
    const [products, setProducts] = useState([])
    const fetchData = async () => {

        await axios.get('http://localhost:8000/api/products').then((res) => {

            setProducts(res.data)
            console.log('products', res.data)
        }).catch((err) => console.log(err))

    }
    useEffect(() => {
        fetchData();
    }, []);


    const deleteData = async (id) => {

        await axios.delete(`http://localhost:8000/api/products/${id}`).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err))

    }


    return (
        <div className='justify-content-center '>



            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">title</th>
                        <th scope="col">description</th>
                        <th scope="col">image</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((p, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{p.id}</th>
                                <td>{p.title}</td>
                                <td>{p.description}</td>
                                <td> <img width="100px" src={`http://localhost:8000/images/${p.image}`} alt='' /></td>
                                <td> <button className="btn btn-danger" onClick={() => { deleteData(p.id) }}> delete</button>
                                    <Link className='btn btn-success ' to={`/edit/${p.id}`}>edit</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div>
    )
}
