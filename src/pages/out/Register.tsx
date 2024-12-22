import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center  mx-auto  ">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 max-w-xl			 xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-[#333160] text-center md:text-3xl">
            ¡Empieza a usar PaynomPR!
          </h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
