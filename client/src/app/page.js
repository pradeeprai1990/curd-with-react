"use client"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  let [insertStatus,setinsertStatus]=useState(false)
  let [student, setStudent] = useState([])
  let [path, setPath] = useState('')
  let studentSave = (event) => {
    setinsertStatus(true)
    event.preventDefault();
    // let uname = event.target.uname.value
    // let email = event.target.email.value
    // let phone = event.target.phone.value
    // let obj = { uname, email, phone }

    let formDataValue = new FormData(event.target)
    axios.post(`http://localhost:8000/website/home/student-insert`, formDataValue)
      .then((res) => {
        console.log(res.data)
        setinsertStatus(false)
        event.target.reset();
        getStudent()
      })

  }


  let getStudent = () => {
    axios.get(`http://localhost:8000/website/home/student-view`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          setStudent(finalRes.data)
          setPath(finalRes.path)
        }

      })
  }

  let deleteRow = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`http://localhost:8000/website/home/student-delete/${id}`)
          .then((res) => {

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            getStudent()
          })




      }
    });




  }

  useEffect(() => {
    getStudent()
  }, [])
  return (
    <div className="grid grid-cols-[30%_auto] gap-8">
      <div className="shadow-lg p-8">
        <form class="mb-6" onSubmit={studentSave}>
          <div class="mb-6">
            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="name" name="uname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
          </div>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
          </div>
          <div class="mb-6">
            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input type="text" id="name" name="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone" required />
          </div>

          <div class="mb-6">
            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
            <input type="file" id="name" name="photo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone" required />
          </div>
          
          { insertStatus ?
             <button disabled type="button" class="text-white w-[100%]  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
             <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
               <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
             </svg>
             Loading...
           </button>
           :
           <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block">Send message</button>
       
          
          
          }
          
         

         
       
        </form>
      </div>
      <div className="shadow-lg  p-8">


        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Student Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Student Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Student Phone
                </th>
                <th scope="col" class="px-6 py-3">
                  Photo
                </th>
                <th scope="col" class="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {
                student.length >= 1
                  ?
                  student.map((items, index) => {
                    return (
                      <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index + 1}
                        </th>
                        <td class="px-6 py-4">
                          {items.uname}
                        </td>
                        <td class="px-6 py-4">
                          {items.email}
                        </td>
                        <td class="px-6 py-4">
                          {items.phone}
                        </td>
                        <td class="px-6 py-4">
                          <img width={100} src={path + items.photo} />
                        </td>
                        <td class="px-6 py-4">
                          <button onClick={() => deleteRow(items._id)} className="p-3 bg-blue-600 text-white">Delete</button>
                        </td>
                      </tr>
                    )
                  })
                  :
                  <tr>
                    <td colSpan={5}> No Data Found</td>
                  </tr>

              }


            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
