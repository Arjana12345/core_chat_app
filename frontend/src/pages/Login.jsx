import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { loginUser } from "../features/auth/authApi";

import { setCredentials,} from "../features/auth/authSlice";

function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
                                      email: "",
                                      password: "",
                                    });

  useEffect(() => {

    if (user) {
      navigate("/chat");
    }

  }, [user, navigate]);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser(formData);
      
      console.log("data =");
      console.log(data);

      dispatch(setCredentials(data));

      toast.success("Login Successful");

    } catch (error) {
      console.log("login error");
      console.log(error);
      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;

