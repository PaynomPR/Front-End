import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center  mx-auto  ">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 max-w-xl			 xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-[#333160] md:text-3xl">
            Iniciar sesión
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
