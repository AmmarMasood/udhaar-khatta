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

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  // Register user
  const register = async (user, setLoading) => {
    setLoading(true);
    const res = await axios.post(
      `${process.env.BACKEND_API}/auth/signup`,
      user
    );
    if (res) {
      router.push("/login");
    }
    setLoading(false);
  };

  // Login user
  const login = async ({ email, password }, setLoading) => {
    setLoading(true);
    const res = await axios.post(`${process.env.BACKEND_API}/auth/login`, {
      email,
      password,
    });
    if (res.data) {
      console.log(res.data);
      const { id, email, roles, accessToken, profileCompleted } = res.data;
      localStorage.setItem("jwt", accessToken);
      setUser({ id, email, role: roles[0].name });
      if (profileCompleted) {
        router.push("/workspace/my-khata");
      } else {
        router.push(`/join/complete-profile/${id}`);
      }
    }
    setLoading(false);
  };
  // complete profile
  const completeProfile = async (values, setLoading) => {
    setLoading(true);
    setAuthToken(localStorage.getItem("jwt"));
    const res = await axios.put(
      `${process.env.BACKEND_API}/user/profile/update`,
      { ...values, habitualResidence: values.habitualResidence[0] }
    );
    if (res) {
      router.push(`/workspace/my-khata`);
      console.log("ammar", res.data);
    }
    console.log("ammar", res.data);
    setLoading(false);
  };

  // Check if user is logged in
  const getUserProfile = async (setLoading) => {
    // setLoading(true);
    setAuthToken(localStorage.getItem("jwt"));
    const res = await axios.get(`${process.env.BACKEND_API}/user/profile`);
    if (res) {
      setUser(res.data);
    }
    // setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        getUserProfile,
        register,
        completeProfile,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {" "}
      <UserMenuContext.Provider value={[menuNumber, setMenuNumber]}>
        {children}
      </UserMenuContext.Provider>
    </AuthContext.Provider>
  );
};
