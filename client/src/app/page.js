"use client"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  let [student, setStudent] = useState([])
  let studentSave = (event) => {
    event.preventDefault();
    let uname = event.target.uname.value
    let email = event.target.email.value
    let phone = event.target.phone.value
    let obj = { uname, email, phone }
    axios.post(`http://localhost:8000/website/home/student-insert`, obj)
      .then((res) => {
        console.log(res.data)
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

          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block">Send message</button>
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
