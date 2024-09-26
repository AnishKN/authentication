// @ts-ignore

import SignUpCard from "../components/SignUpCard.tsx";

function SignUp() {
  return (
    <div className="h-screen w-full overflow-hidden bg-white flex flex-col lg:flex-row justify-center items-center">
      {/* Hide image on mobile and show on larger screens */}
      <img
        className="hidden lg:block lg:h-full lg:w-1/2"
        src="/signup.png"
        alt="SignUp image"
      />

      <div className="w-full lg:w-1/2 p-8 lg:p-24">
        <SignUpCard />
      </div>
    </div>
  );
}

export default SignUp;
