import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';


const ProtectedRoute = ({children}) => {
  const {user,logout} = UserAuth();
  const navigate = useNavigate();
  console.log(user);
  const isAuthenticated = localStorage.getItem("faceAuth");

    if(!isAuthenticated){
        return <Navigate to="/"/>
    }
    if(!user?.emailVerified){
      return (
        <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold text-center">
                Verify you email.
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
   
              {/*footer*/}
              <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("faceAuth");
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      )
    }
  return children;
}
export default ProtectedRoute
