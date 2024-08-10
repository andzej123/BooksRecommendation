import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/post";
import { useState } from "react";
import "./Forms.css";

const LoginForm = () => {
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const formSubmitHandler = async (data) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.token);
      reset();
      navigate("/homepage");
    } catch (error) {
      setError(error.message);
      if (error.response.status === 401) {
        setError("Wrong login or password");
      }
    }
  };

  return (
    <>
      <form
        noValidate
        className="form width-fitContent"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="formInputBody">
          <input
            className="formInput"
            type="text"
            placeholder="Username"
            {...register("username")}
          />
        </div>
        <div className="formInputBody">
          <input
            className="formInput"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>

        <input className="submitButton" type="submit" value="Login" />
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
};

export default LoginForm;
