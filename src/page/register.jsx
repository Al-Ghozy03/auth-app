import dev from "../assets/devchallenges.svg";
import SocialMedia from "../component/social_media";
import google from "../assets/Google.svg";
import fb from "../assets/Facebook.svg";
import github from "../assets/Gihub.svg";
import twitter from "../assets/Twitter.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { base_url } from "../api/api";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [msgError, setMsgError] = useState();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      let url = `${base_url}/register`;
      const res = await axios.post(url, data);
      localStorage.setItem("token", res.data.token);
      navigate("/profile", { replace: true });
    } catch (er) {
      setMsgError(er.response.data.error.email.msg);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <div className="border border-gray-300 w-1/3 px-14 py-10 rounded-lg">
          <img src={dev} alt={dev} className="" />
          <h1 className="text-lg mt-5 mb-2 font-semibold">
            Join thousands of leaners from arround the world
          </h1>
          <p className="text-sm">
            Master web development by making real-life projects. there are
            multiple path for you to choose
          </p>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <svg
                className="h-6 w-6 fill-current text-[#828282] mt-1 ml-2 absolute"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <input
                {...register("email")}
                type="email"
                placeholder="E-mail"
                className="border rounded-md h-8 border-gray-300 w-full outline-none text-sm pl-10"
              />
              <small className="text-xs italic text-red-500">{msgError}</small>
            </div>
            <div className="my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-current text-[#828282] mt-1 ml-2 absolute"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="border rounded-md h-8 border-gray-300 w-full outline-none text-sm pl-10"
              />
            </div>
            <button className="w-full bg-[#2F80ED] text-sm font-medium text-white py-1 rounded-md">
              Start coding now
            </button>
          </form>
          <p className="text-center text-[#828282] text-xs my-4">
            or continue with these social media
          </p>
          <div className="flex justify-center space-x-3">
            <SocialMedia icon={google} />
            <SocialMedia icon={fb} />
            <SocialMedia icon={twitter} />
            <SocialMedia icon={github} />
          </div>
          <p className="text-center text-[#828282] text-xs my-4">
            Already a member?{" "}
            <Link className="text-[#2F80ED]" to={-1}>
              Login
            </Link>
          </p>
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
