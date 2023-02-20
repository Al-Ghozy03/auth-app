import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { base_url, headers } from "../api/api";
import Header from "../component/header";
import Label from "../component/label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    phone: yup.string().required(),
    email: yup.string().required(),
  })
  .required();

export default function Edit() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [img, setImg] = useState();
  const [imgData, setImgData] = useState();
  const [msgImage, setMsgImage] = useState();
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      let url = `${base_url}/profile`;
      let res = await axios.get(url, headers);
      setDetail([res?.data?.data]);
    } catch (er) {
      console.log(er);
    }
  }
  function getImage(e) {
    if (e.target.files && e.target.files[0]) {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/png"
      ) {
        setImg(URL.createObjectURL(e.target.files[0]));
        setImgData(e.target.files[0]);
      } else {
        setMsgImage("Hanya file ber-ekstensi .jpeg, .jpg, .png");
      }
    }
  }
  async function onSubmit(data) {
    setLoading(true);
    try {
      let url = `${base_url}/update`;
      let formdata = new FormData();
      formdata.append("name", data.name);
      formdata.append("bio", data.bio);
      formdata.append("phone", data.phone);
      formdata.append("email", data.email);
      formdata.append("password", data.password);
      formdata.append("photo_profile", imgData);
      setLoading(false);
      await axios.put(url, formdata, headers);
      navigate(-1);
    } catch (er) {
      setLoading(false);
      console.log(er);
    }
  }
  useState(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container px-14 py-6">
        {detail?.map((i, head) => (
          <Header key={head} img={i.photo_profile} user={i.email} />
        ))}
        <button onClick={() => navigate(-1)} className="flex space-x-5 my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <p className="text-sm text-blue-500">Back</p>
        </button>

        <div className="h-screen w-full flex flex-col">
          <div className="border border-gray-300 rounded-lg w-full px-8 py-8 mb-10">
            {/* top */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-xl font-semibold">Change info</h1>
                <small className="text-xs text-[#828282]">
                  Changes will be reflected to every service
                </small>
              </div>
            </div>
            {/* top */}

            {detail?.map((i, key) => {
              return (
                <form key={key} onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex space-x-5 items-center mb-5">
                    <div
                      style={{
                        backgroundImage: `url(${
                          img === undefined ? i.photo_profile : img
                        })`,
                      }}
                      className="h-20 w-20 bg-gray-200 rounded-md bg-cover bg-center"
                    >
                      <div className="bg-black h-full flex justify-center items-center w-full bg-opacity-50 rounded-md">
                        <input
                          accept=".jpg, .jpeg, .png"
                          type="file"
                          onChange={getImage}
                          className="absolute w-20 h-20 opacity-0"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="uppercase text-[#828282] font-medium">
                      Change photo
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 mt-3">
                    <Label text={"Name"} />
                    <input
                      {...register("name", {
                        value: i.name == "null" ? "" : i.name,
                      })}
                      placeholder="Enter your name..."
                      type="text"
                      className="outline-none border text-sm px-3 w-1/2 h-10 rounded-lg border-[#828282]"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 mt-3">
                    <Label text={"Bio"} />
                    <textarea
                      {...register("bio", {
                        value: i.bio == "null" ? "" : i.bio,
                      })}
                      className="outline-none border text-sm px-3 py-3 w-1/2 h-32 resize-none rounded-lg border-[#828282]"
                      placeholder="Enter your bio..."
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 mt-3">
                    <Label text={"Phone"} />
                    <input
                      {...register("phone", { value: i.phone })}
                      placeholder="Enter your phone..."
                      type="number"
                      className="outline-none appearance-none border text-sm px-3 w-1/2 h-10 rounded-lg border-[#828282]"
                    />
                    <small className="text-xs italic text-red-500">
                      {errors.phone?.message}
                    </small>
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 mt-3">
                    <Label text={"Email"} />
                    <input
                      {...register("email", { value: i.email })}
                      placeholder="Enter your email..."
                      type="email"
                      className="outline-none border text-sm px-3 w-1/2 h-10 rounded-lg border-[#828282]"
                    />
                    <small className="text-xs italic text-red-500">
                      {errors.email?.message}
                    </small>
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 mt-3">
                    <Label text={"Password"} />
                    <input
                      {...register("password")}
                      placeholder="Enter your password..."
                      type="password"
                      className="outline-none border text-sm px-3 w-1/2 h-10 rounded-lg border-[#828282]"
                    />
                  </div>
                  <button className="bg-blue-500 text-white px-5 py-1 rounded-md mt-5">
                    {loading ? "loading..." : "Save"}
                  </button>
                </form>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
