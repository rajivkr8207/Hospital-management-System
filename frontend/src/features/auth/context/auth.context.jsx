"use client";

import { createContext, useEffect, useState } from "react";
import { GetMe } from "../services/auth.api";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [UserData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function userFinder() {
    const role = UserData?.role;
    if (role == "ADMIN") {
      router.push("/admin/dashboard");
      return;
    }
    if (role == "DOCTOR") {
      router.push("/doctor/dashboard");
      return;
    }
    if (role == "PATIENT") {
      router.push("/patient/dashboard");
      return;
    }
  }
  async function fetchuser() {
    setLoading(true);
    try {
      const res = await GetMe();
      // console.log(res);
      setUserData(res.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchuser();
  }, []);

  useEffect(() => {
    userFinder()
  }, [UserData])
  

  return (
    <AuthContext.Provider
      value={{ UserData, setUserData, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
