import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import setAuthToken from "@/helpers/useAuthToken";

export const AuthContext = createContext();
export const UserMenuContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuNumber, setMenuNumber] = useState("1");

  const router = useRouter();

  // uncomment me
  // useEffect(() => checkUserLoggedIn(), []);

  // useEffect(() => {
  //   if (localStorage.getItem("jwt")) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // });

  // Register user
  // const register = async (user, setLoading) => {
  //   setLoading(true);
  //   const res = await axios.post(
  //     `${process.env.BACKEND_API}/auth/signup`,
  //     user
  //   );
  //   if (res) {
  //     router.push("/login");
  //   }
  //   setLoading(false);
  // };

  const register = async (user, setLoading) => {
    setLoading(true);
    try {
      console.log(
        "here",
        process.env.FRONTEND_API_URL,
        process.env.BACKEND_API
      );

      const data = await axios.post(
        `${"http://localhost:3006"}/api/register`,
        user
      );
      if (data) {
        router.push("/login");
      }
    } catch (err) {
      setError(err.response.data.err);
      setError(null);
    }
    setLoading(false);
  };

  // Login user
  const login = async (vals, setLoading) => {
    setLoading(true);
    try {
      const res = await axios.post(`${"http://localhost:3006"}/api/login`, {
        email: vals.email,
        password: vals.password,
      });

      const { id, email, roles, profileCompleted } = res.data;
      console.log(res.data);
      setUser({ id, email, role: roles[0].name });
      if (profileCompleted) {
        router.push("/workspace/my-khata");
      } else {
        router.push(`/join/complete-profile/${id}`);
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        setError(
          "Unable to login, todo: fix map the correct error from backend"
        );
        setError(null);
      }
      console.log(error);
    }

    setLoading(false);
  };

  // const login = async ({ email, password }, setLoading) => {
  //   setLoading(true);
  //   const res = await axios.post(`${process.env.BACKEND_API}/auth/login`, {
  //     email,
  //     password,
  //   });
  //   if (res.data) {
  //     console.log(res.data);
  //     const { id, email, roles, accessToken, profileCompleted } = res.data;
  //     localStorage.setItem("jwt", accessToken);
  //     setUser({ id, email, role: roles[0].name });
  //     if (profileCompleted) {
  //       router.push("/workspace/my-khata");
  //     } else {
  //       router.push(`/join/complete-profile/${id}`);
  //     }
  //   }
  //   setLoading(false);
  // };
  // // complete profile
  const completeProfile = async (values, token, setLoading) => {
    setLoading(true);
    if (token) {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.put(
          `${"http://localhost:5001"}/user/profile/update`,
          { ...values, habitualResidence: values.habitualResidence[0] }
        );
        if (res) {
          router.push(`/workspace/my-khata`);
        }
      } catch (err) {
        console.log("mmm", err);
      }
    }

    setLoading(false);
  };

  const checkUserLoggedIn = async () => {
    try {
      const res = await axios(`${"http://localhost:3006"}/api/user`);
      setUser(res.data.user);
      console.log("here nigga", res);
    } catch (err) {
      setError("Error whille getting user profile");
      setError(null);
      logout();
      console.log(err);
    }
  };

  const logout = async () => {
    // console.log("logout");
    const res = await fetch(`${"http://localhost:3006"}/api/logout`, {
      method: "POST",
    });

    if (res) {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        // getUserProfile,
        register,
        completeProfile,
        login,
        logout,
        // isLoggedIn,
      }}
    >
      {" "}
      <UserMenuContext.Provider value={[menuNumber, setMenuNumber]}>
        {children}
      </UserMenuContext.Provider>
    </AuthContext.Provider>
  );
};
