import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/post";
import { useState } from "react";
import "./Forms.css";

const LoginForm = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const formSubmitHandler = async (data) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.token);
      reset();
      navigate("/homepage");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form
        noValidate
        className="form"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div>
          <input
            className="formInput"
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          <p className="errorMessage">{errors.username?.message}</p>
        </div>
        <div>
          <input
            className="formInput"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <p className="errorMessage">{errors.password?.message}</p>
        </div>

        <input className="submitButton" type="submit" value="Login" />
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
};

export default LoginForm;
