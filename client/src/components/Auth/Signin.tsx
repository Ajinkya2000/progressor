import Input from "../utils/Input";

const Signin = () => {
  return (
    <form className="flex flex-col">
      <h2 className="text-3xl my-3">Welcome back</h2>
      <p className="text-slate-400 mb-6">Hello, who's this?</p>
      <Input type="text" label="Email" placeholder="Enter your email" />
      <Input type="password" label="Password" placeholder="Enter your password" />
      <button type="button" className="mt-3 self-end text-xs text-primary font-bold">Forgot password?</button>
      <button type="submit" className="my-6 w-full inline-block px-6 py-2.5 bg-primary text-white text-sm rounded shadow-md">Sign In</button>
    </form>
  )
};

export default Signin;