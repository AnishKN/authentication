// @ts-ignore
import SignInCard from "../components/SignInCard.tsx";

function SignIn() {
  return (
    <div className="h-screen w-full overflow-hidden bg-white flex flex-col lg:flex-row justify-center items-center">
      {/* Hide image on mobile and show on larger screens */}
      <img
        className="hidden lg:block lg:h-full lg:w-1/2"
        src="/signin.png"
        alt="SignIn image"
      />

      <div className="w-full lg:w-1/2 p-8 lg:p-24">
        <SignInCard />
      </div>
    </div>
  );
}

export default SignIn;
