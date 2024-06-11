import React, { useState , useEffect } from 'react';
import data from './EmplData'

function CRUD() {
  const [Data , setData] = useState([]);
  const [Name , setName] = useState();
  const [Dep , setDep] = useState();
  const [ID , setID] = useState();
  const [update , setUpdate] =useState(false);

  useEffect(()=>{
    setData(data);
  },[])

  const handleDelete = (id)=>{
    const dt = Data.filter((item)=>item.id !==id)
    setData(dt)
  }

  const handleEdit = (id)=>{
    const dt = Data.filter((item)=> item.id == id);
    setName(dt[0].name);
    setDep(dt[0].dep);
    setID(id)
    setUpdate(true);
   }

   const handleUpdate = ()=>{
    const index = Data.findIndex(item =>item.id ===ID);
    const dt = [...Data];
    dt[index] = {id:ID , name:Name , dep:Dep}
    setData(dt)
    setUpdate(false);
    clear();
   }

   const clear =()=>{
    setName('')
    setDep('');
    setUpdate(false)
   }

  const handleSave = (e)=>{
    e.preventDefault();
    if(Name==='' && Dep===''){
       alert('fill the form');
     return 
    }
    else{
     const dt = [...Data];
     let newEntry = {
      id: Data.length+1,
      name:Name,
      dep:Dep
     }
     dt.push(newEntry)
     setData(dt);
     clear();
  }
  }

   const clearTable = ()=>{
    setData([])
   }

  return (
    <>

     <div className='my-4 flex justify-center'>
      <label>Enter name:</label>
       <input type='text' className='border mr-4 outline-none' placeholder='Enter name' value={Name} 
       onChange={(e)=>{setName(e.target.value)}}/>
       <label>Enter Dep:</label>
       <input type='text' className='border outline-none' placeholder='Enter Department' value={Dep}
       onChange={(e)=>{setDep(e.target.value)}}/>
      {
        (!update)?
       <button className='bg-blue-400 text-white px-2 hover:bg-blue-700 mx-2' onClick={(e)=>{handleSave(e)}}>Save</button>
       :
       <button className='bg-blue-400 text-white px-2 hover:bg-blue-700' onClick={()=>{handleUpdate()}}>Update</button>
      }
       <button className='bg-red-400 text-white px-2 hover:bg-red-700 mx-2' onClick={()=>{clear()}}>Clear</button>
     </div>

     <table className='min-w-full my-2'>
       <thead className='bg-gray-800 text-white'>
        <tr>
          <th className='py-2'>ID</th>
          <th className='py-2'>Name</th>
          <th className='py-2'>Dep</th>
          <th className='py-2'>Action</th>
        </tr> 
       </thead> 
       <tbody className='bg-white shadow-xl divide-y divide-gray-200'>
         {
          Data.map((item , index)=>{
            return(
              <tr key={index} className='text-center'>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.dep}</td>
               <button className='bg-blue-400 px-2 text-white mx-2 hover:bg-blue-700' onClick={()=>{handleEdit(item.id)}}>Edit</button>
               <button className='bg-red-400 px-2 text-white hover:bg-red-700' onClick={()=>{handleDelete(item.id)}}>Delete</button>
             </tr>
            )
          })
        }
      </tbody> 
    </table> 
        <div className='flex justify-center'>
          <button className='bg-blue-400 text-white px-1 py-1 text-xl' 
          onClick={()=>{clearTable()}}>All Clear</button>
        </div>
    </>
  )
}

export default CRUD
