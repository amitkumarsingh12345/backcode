import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const DeleteCategory = () => {
   const params =  useParams();
   const navigate = useNavigate();
   const editHandler = async() => {
       const data = await axios.delete(`${window.location.origin}/api/v3/category/delete/${params.id}`);
       navigate('/Categories');
   }
   useEffect( () => {
      editHandler();
   },[]);
}
export default DeleteCategory