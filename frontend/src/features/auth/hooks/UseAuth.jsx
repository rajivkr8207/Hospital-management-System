import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { LogOutUser, LoginUser, RegisterUser } from "../services/auth.api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UseAuth = () => {
  const context = useContext(AuthContext);
  const { UserData, setUserData, loading, setLoading, userFinder } = context;
  const router = useRouter();
  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const res = await RegisterUser(data);
      toast.success(res.message);
      router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handlelogin = async (data) => {
    setLoading(true);
    try {
      const res = await LoginUser(data);
      setUserData(res.user);
      toast.success(res.message);
      // router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlelogout = async () => {
    setLoading(true);
    try {
      const res = await LogOutUser();
      toast.success(res.message);
      setUserData(null);
      router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { UserData, handleRegister, loading, handlelogin, handlelogout };
};

export default UseAuth;
