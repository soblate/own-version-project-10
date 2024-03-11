import { get_school, school_login, school_logout, school_register } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { getAuthenticatedSchoolUser } from "@/lib/schoolauth";

function useMutationSchoolUser() {
  const { toast } = useToast();
  const setSchoolUser = useStore((state) => state.setSchoolUser);

  const clearSchoolUser = useStore((state) => state.clearSchoolUser);

  const setSchoolProfile = useStore((state) => state.setSchoolProfile);
  // const clearSchoolProfile = useStore((state) => state.clearSchoolProfile);


  const loginSchoolUser = async (username: string, password: string) => {
    try {
      const user = await school_login(username, password);
      // console.log(userId);
      // console.log(user);
      setSchoolUser(user);
      // setSchoolId(userId);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to login",
        description:
          (error as Error).message ||
          "There was an error signing you in. Please try again later.",
      });
    }
  };

  const getSchoolProfile = async (username: string) => {
    try {
      const user = await get_school(username);
      setSchoolProfile(user);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to login",
        description:
          (error as Error).message ||
          "There was an error signing you in. Please try again later.",
      });
    }
  };

  const logoutSchoolUser = async () => {
    try {
      await school_logout();
      clearSchoolUser();
      // clearSchoolProfile();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to logout",
        description:
          (error as Error).message ||
          "There was an error signing you out. Please try again later.",
      });
    }
  };

  const registerSchoolUser = async (
    username: string,
    password: string,
    email: string,
    name: string,
    city: string,
    state: string,
  ) => {
    try {
      await school_register(username, password, email, name, city, state);
      toast({
        variant: "default",
        title: "Registration successful",
        description: "Please login with your credentials.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to register",
        description:
          (error as Error).message ||
          "There was an error registering you. Please try again later.",
      });
    }
  };

    useEffect(() => {
    try {
      const user = getAuthenticatedSchoolUser();
      setSchoolUser(user);
    } catch (error) {
      clearSchoolUser();
    }
  }, []);

  return { loginSchoolUser, logoutSchoolUser, registerSchoolUser, getSchoolProfile };
}

export default useMutationSchoolUser;
