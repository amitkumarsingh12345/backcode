import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
console.log("---------------------------------")
const DeleteCategory = () => {
   const params =  useParams();
   const navigate = useNavigate();
   
   console.log("---------------------------------")
   console.log(params.id)

   const deleteHandler = async() => {
       const data = await axios.delete(`${window.location.origin}/api/v3/category/delete/${params.id}`);
       console.log(data)
       navigate('/Categories');
   }
   useEffect( () => {
      deleteHandler();
   },[]);
}
export default DeleteCategory