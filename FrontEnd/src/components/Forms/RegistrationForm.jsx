import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/post";
import "./Forms.css";

const RegistrationForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formSubmitHandler = async (data) => {
    try {
      await registerUser(data);
      reset();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form
        className="form"
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="formInputBody">
          <input
            type="text"
            placeholder="First name"
            className="formInput"
            {...register("firstName", {
              required: "This field is mandatory",
              validate: (value) => {
                return !!value.trim() || "This field is mandatory";
              },
            })}
          />
           {errors.firstName ? <p className="error">{errors.firstName.message}</p> : ""}
        </div>
        <div className="formInputBody">
          <input
            type="text"
            placeholder="Last name"
            className="formInput"
            {...register("lastName", {
              required: "This field is mandatory",
              validate: (value) => {
                return !!value.trim() || "This field is mandatory";
              },
            })}
          />
           {errors.lastName ? <p className="error">{errors.lastName.message}</p> : ""}
        </div>
        <div className="formInputBody">
          <input
            type="email"
            placeholder="Email"
            className="formInput"
            {...register("email", {
              required: "This field is mandatory",
              validate: (value) => {
                return !!value.trim() || "This field is mandatory";
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
           {errors.email ? <p className="error">{errors.email.message}</p> : ""}
        </div>
        <div className="formInputBody">
          <input
            type="text"
            placeholder="Username"
            className="formInput"
            {...register("username", {
              required: "This field is mandatory",
              validate: (value) => {
                return !!value.trim() || "This field is mandatory";
              },
            })}
          />
           {errors.username ? <p className="error">{errors.username.message}</p> : ""}
        </div>
        <div className="formInputBody">
          <input
            type="password"
            placeholder="Password"
            className="formInput"
            {...register("password", {
              required: "This field is mandatory",
              validate: {
                notEmpty: (value) =>
                  !!value.trim() || "This field is mandatory",
                atLeast4: (value) =>
                  value.length >= 4 ||
                  "Password must tave at least 4 characters",
              },
            })}
          />
           {errors.password ? <p className="error">{errors.password.message}</p> : ""}
        </div>

        <input className="submitButton" type="submit" value="Register" />
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default RegistrationForm;
