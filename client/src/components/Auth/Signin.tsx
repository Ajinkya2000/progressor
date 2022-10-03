import Input from "../utils/Input";

const Signin = () => {
  return (
    <div>
      <h2 className="text-3xl">Welcome back</h2>
      <p className="text-slate-400">Hello, who's this?</p>
      <Input type="text" label="Email" placeholder="Enter your email" />
      <Input type="password" label="Password" placeholder="Enter your password" />
    </div>
  )
};

export default Signin;