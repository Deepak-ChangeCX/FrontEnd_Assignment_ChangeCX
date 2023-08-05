import ToastContext from "@/context/ToastContext";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
const URL = "http://localhost:9000";
const AllUserPage = () => {
  const router = useRouter();
  const { toast } = useContext(ToastContext) as any;
  const [AllUser, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);

  const CallRequest = () => {
    axios
      .get(`${URL}/api/v1/user/dashboard?page=${page}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setAllUsers(res.data.users);
        // console.log(res.data)
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      router.push("/Home");
      toast.error("Not a Admin User");
    } else {
      CallRequest();
    }
  }, [page]);

  const handleRemoveAccess = (id: any) => {
    axios
      .patch(
        `${URL}/api/v1/user/removeaccess/${id}`,
        {},
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        // setAllUsers(res.data.user)

        toast.success("Access Removed");
        CallRequest();
        // console.log(res.data)
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
  const handleApproveAccess = (id: any) => {
    axios
      .patch(
        `${URL}/api/v1/user/ApproveAccess/${id}`,
        {},
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        // setAllUsers(res.data.user)

        toast.success("Access Approved");
        CallRequest();
        // console.log(res.data)
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };

  const handlePage = (mode: any) => {
    switch (mode) {
      case "next":
        if (AllUser.length === 6) {
          return setPage(page + 1);
        }
        break;
      case "back": {
        if (page > 1) {
          return setPage(page - 1);
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <section className="relative py-16 bg-blueGray-50">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blue-900 text-white">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-lg text-white">
                    All Users
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto h-auto ">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      UserId
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Email
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Mobile Number
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Role
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Access
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {AllUser?.map((items: any, idx: any) => (
                    <tr
                      key={idx}
                      className="border-b-2 border-pink-950 cursor-pointer hover:bg-pink-950"
                    >
                      <td className="px-6 py-4">
                        USR{items?._id?.split("").splice(0, 5).join("")}
                      </td>
                      <td className="px-6">{items?.EmailId}</td>
                      <td className="px-6">{items?.PhoneNo}</td>
                      <td className="px-6">{items?.Role}</td>
                      <td className="px-6">
                        {!items?.IsDeleted ? "Approve" : "Denied"}
                      </td>
                      <td className="px-6">
                        {!items?.IsDeleted ? (
                          <button onClick={() => handleRemoveAccess(items._id)} className="px-2 py-2 bg-red-500 rounded-lg shadow-lg">
                            Remove Access
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApproveAccess(items._id)}
                            className="px-2 py-2 bg-green-500 rounded-lg shadow-lg"
                          >
                            Approve Access
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex m-auto px-2 py-2 gap-4">
              <button onClick={() => handlePage("back")}>&lt;</button>
              {page}
              <button onClick={() => handlePage("next")}>&gt;</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllUserPage;
