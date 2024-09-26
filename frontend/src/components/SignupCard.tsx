import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const SignUpCard = () => {
  const navigate = useNavigate();
  const [ disabledBtn, setDisabledBtn ] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
      if (data.retypePassword !== data.password) {
        toast.error("Passwords do not match!");
        return;
      }
      setEmail(data.email);

      let url = `${import.meta.env.VITE_BACKEND_URL}user/signup`;
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
          localStorage.setItem("user", JSON.stringify(response.data.user));
          onOpenModal();
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

  const handleVerify = () => {
    setDisabledBtn(true)
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}user/verify`, { email, otp })
      .then((response) => {
        let message = response?.data?.message || "Success!!";
        onCloseModal();
        toast.success(message);
        navigate("/user/signin")
      })
      .catch((error) => {
        console.log(error);
        let message = error.response?.data?.message || "something went wrong!";
        toast.error(message);
      });
      setDisabledBtn(false)
  };

  return (
    <div className="bg-white rounded-lg p-8 text-gray-600 shadow-xl border-2">
      {/* Heading and Sign In Link */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-900">
          Let us know <span className="text-red-600">!</span>
        </h2>
        <NavLink
          to="/user/signin"
          className="text-sm text-blue-900 underline font-bold"
        >
          Sign <span className="text-red-600">In</span>
        </NavLink>
      </div>
      <Toaster />
      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            type="text"
            className="py-2 px-3 border-b-2 outline-none w-full"
            placeholder="First Name"
            {...register("firstName", {
              required: "First Name is required",
            })}
          />
          {errors.firstName && (
            <div className="text-red-500">{errors.firstName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="py-2 px-3 border-b-2 outline-none w-full"
            placeholder="Last Name"
            {...register("lastName", {
              required: "Last Name is required",
            })}
          />
          {errors.lastName && (
            <div className="text-red-500">{errors.lastName.message}</div>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            type={showPass ? "text" : "password"}
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
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <BiSolidHide /> : <BiSolidShow />}
          </div>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 relative">
          <input
            type={showPass2 ? "text" : "password"}
            className="py-2 px-3 border-b-2 outline-none w-full pr-10" // Add padding to the right for icon space
            placeholder="Password"
            id="retypePassword"
            {...register("retypePassword", {
              required: "re-type Password is required",
              minLength: {
                value: 8,
                message: "Password must contain a minimum of 8 characters!",
              },
            })}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPass2(!showPass2)}
          >
            {showPass2 ? <BiSolidHide /> : <BiSolidShow />}
          </div>
          {errors.retypePassword && (
            <div className="text-red-500">{errors.retypePassword.message}</div>
          )}
        </div>
        <div className="mb-4">
          <select
            id="contactMode"
            className="py-2 px-3 border-b-2 outline-none w-full"
            defaultValue=""
            {...register("contactMode", {
              required: "Contact Mode is required",
            })}
          >
            <option value="" disabled>
              Contact Mode
            </option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="Phone">Phone</option>
          </select>
          {errors.contactMode && (
            <div className="text-red-500">{errors.contactMode.message}</div>
          )}
        </div>

        <div className="mb-6">
          <input
            type="email"
            className="py-2 px-3 border-b-2 outline-none w-full"
            placeholder="Email"
            {...register("email", {
              required: "Email Mode is required",
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading ..." : "Sign Up"}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>

      <Modal open={open} onClose={onCloseModal} center>
        <h2 className="text-xl font-bold text-gray-900 text-center sm:text-2xl">
          Enter OTP
        </h2>
        <div className="p-4 sm:p-8 flex flex-col justify-center items-center">
          <p className="text-center text-sm sm:text-base">
            An OTP has been sent to{" "}
            <span className="text-purple-800">{email}</span>. Please enter and
            verify below!
          </p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span className="hidden sm:inline"> - </span>} // Hide separator on mobile
            renderInput={(props) => (
              <input
                {...props}
                className="border border-gray-300 rounded-lg w-4 h-4 text-lg focus:outline-none focus:border-purple-500"
              />
            )}
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              flexWrap: "wrap", // Allow inputs to wrap on small screens
            }}
            inputStyle={{
              width: "50px", // Width of input remains the same
              height: "50px",
              fontSize: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              margin: "0 10px",
            }}
          />
          <button
            className="bg-purple-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg w-full sm:w-28 mt-4"
            onClick={handleVerify}
            disabled={disabledBtn}
          >
            Verify
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SignUpCard;
