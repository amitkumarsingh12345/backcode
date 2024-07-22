import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const DeleteProduct = () => {
   const params =  useParams();
   const navigate = useNavigate();
   const deleteHandler = async() => {
       const data = await axios.delete(`${window.location.origin}/api/v4/product/delete/${params.id}`);
       navigate('/Products');
   }
   useEffect( () => {
      deleteHandler();
   },[]);
}
export default DeleteProduct