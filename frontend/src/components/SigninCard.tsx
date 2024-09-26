import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import React from "react";

const SignInCard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      retypePassword: "",
      contactMode: "",
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      let url = `${import.meta.env.VITE_BACKEND_URL}user/signin`;
      await axios
        .request({
          method: "post",
          maxBodyLength: Infinity,
          url: url,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        })
        .then((response) => {
          let message = response?.data?.message || "Success!!";
          toast.success(message);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/user/dashboard");
        })
        .catch((error) => {
          console.log(error);
          let message =
            error.response?.data?.message || "something went wrong!";
          toast.error(message);
        });
    } catch (error) {
      setError("root", {
        message: "Something went wrong! Try again...",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 text-gray-600 shadow-xl border-2">
      {/* Heading and Sign In Link */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-900">
          Let us know <span className="text-red-600">!</span>
        </h2>
      </div>
      <Toaster />
      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <input
            type="email"
            className="py-2 px-3 border-b-2 outline-none w-full"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4 relative">
          <input
            type={show ? "text" : "password"}
            className="py-2 px-3 border-b-2 outline-none w-full pr-10" // Add padding to the right for icon space
            placeholder="Password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must contain a minimum of 8 characters!",
              },
            })}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {show ? <BiSolidHide /> : <BiSolidShow />}
          </div>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading ..." : "Sign In"}
        </button>

        <NavLink to="/user/signup">
          <button
            type="button"
            className="mt-4 border-2 border-purple-800 text-purple-800 font-bold py-2 px-4 rounded-lg w-full"
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        </NavLink>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
};

export default SignInCard;
