import { Link, useSearchParams } from "@remix-run/react";
import { FaLock, FaUserPlus } from "react-icons/fa";

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  //Login by default
  const authMode = searchParams.get("mode") || "login";

  const submitBtnText = authMode === "login" ? "Login" : "Create User";
  const toggleBtnText =
    authMode === "login" ? "Create a new user" : "Log in with existing user";

  return (
    <form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      <div className="form-actions">
        <button>{submitBtnText}</button>
        <Link to={authMode === "login" ? "?mode=signup" : "?mode=login"}>
          {toggleBtnText}
        </Link>
      </div>
    </form>
  );
}

export default AuthForm;
