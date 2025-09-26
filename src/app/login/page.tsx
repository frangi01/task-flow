import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Logo for light */}
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto block dark:hidden"
        />
        {/* Logo for dark */}
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto hidden dark:block"
        />

        <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        <p className="mt-10 text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
          Not a member?{" "}
          <a
            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
