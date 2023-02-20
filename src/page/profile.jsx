import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url, headers } from "../api/api";
import Header from "../component/header";
import Section from "../component/section";

export default function Profile() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  async function getData() {
    try {
      let url = `${base_url}/profile`;
      let res = await axios.get(url, headers);
      setData(res?.data?.data);
    } catch (er) {
      console.log(er);
      window.location.reload();
    }
  }
  useState(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container px-14 py-6">
        <Header img={data?.photo_profile} user={data?.email} />
        <h1 className="text-4xl font-medium mt-6 text-center">Personal info</h1>
        <p className="text-md text-center mt-2 mb-6">
          Basic info, like your name and photo
        </p>
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <div className="border border-gray-300 rounded-lg w-full">
            {/* top */}
            <div className="flex items-center justify-between px-8 py-2">
              <div>
                <h1 className="text-xl font-semibold">Profile</h1>
                <small className="text-xs text-[#828282]">
                  Some info may be visible to other people
                </small>
              </div>
              <div className="">
                <button onClick={()=>navigate(`/edit/${data?._id}`)} className="border border-[#828282] text-sm px-9 rounded-md py-1">
                  Edit
                </button>
              </div>
            </div>
            {/* top */}
            <hr />
            <div className="flex px-8 py-4 items-center space-x-52">
              <Section text={"Photo"} />
              <div
                style={{ backgroundImage: `url(${data?.photo_profile})` }}
                className="h-20 w-20 bg-gray-300 bg-center bg-cover rounded-lg"
              ></div>
            </div>
            <hr />
            <div className="flex px-8 py-4 items-center space-x-52">
              <Section text={"Name"} />
              <h1 className={`${!data?.name && "text-gray-400"}`}>
                {!data?.name ? "You haven't filled name" : data?.name}
              </h1>
            </div>
            <hr />
            <div className="flex px-8 py-4 items-center space-x-56">
              <Section text={"Bio"} />
              <h1 className={`${!data?.bio && "text-gray-400"}`}>
                {!data?.bio ? "You haven't filled name" : data?.bio}
              </h1>
            </div>
            <hr />
            <div className="flex px-8 py-4 items-center space-x-52">
              <Section text={"Phone"} />
              <h1 className={`${!data?.phone && "text-gray-400"}`}>
                {!data?.phone ? "You haven't filled phone" : data?.phone}
              </h1>
            </div>
            <hr />
            <div className="flex px-8 py-4 items-center space-x-52">
              <Section text={"Email"} />
              <h1>{data?.email}</h1>
            </div>
            <hr />
            <div className="flex px-8 py-4 items-center space-x-44">
              <Section text={"Password"} />
              <h1>{data?.password && "**************"}</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-between space-x-14">
          <small className="mt-2 text-xs text-[#828282]">
            created by{" "}
            <span className="font-semibold">Muhammad Faiz Al Ghozi</span>
          </small>
          <small className="mt-2 text-xs text-[#828282]">
            devChallenges.io
          </small>
        </div>
      </div>
    </>
  );
}
