import React, { useState, useEffect } from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { LOGOUT } from "../../constants/actionType";
import decode from "jwt-decode";
import { useToasts } from "react-toast-notifications";

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToasts();

  const logout = () => {
    dispatch({ type: LOGOUT });
    addToast("Logged out successfully", {
      appearance: `success`,
      autoDismiss: true,
    });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="header">
      <div className="header_title">
        <h3>Resume Builder</h3>
      </div>
      <div className="header_login">
        {user && (
          <div className="header_user">
            <Avatar
              className="header_avatar"
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <p className="header_name">{user.result.name}</p>

            <div className="header_logout">
              <ExitToAppIcon fontSize="large" onClick={logout} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
