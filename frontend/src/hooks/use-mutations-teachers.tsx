import { teacher_login, teacher_logout, teacher_register } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { getAuthenticatedTeacherUser } from "@/lib/teacherauth";
import { TeacherUser } from "@/lib/types";

function useMutationTeacherUser() {
  const { toast } = useToast();
  const setTeacherUser = useStore((state) => state.setTeacherUser);
  const clearTeacherUser = useStore((state) => state.clearTeacherUser);

  const loginTeacherUser = async (username: string, password: string) => {
    try {
      const user: TeacherUser | void = await teacher_login(username, password);
      setTeacherUser(user as unknown as TeacherUser);
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

  const logoutTeacherUser = async () => {
    try {
      await teacher_logout();
      clearTeacherUser();
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

  const registerTeacherUser = async (
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    current_school: string,
    subjects_taught: string,
    current_state: string,
    grades_taught: string,
    years_of_experience: string
  ) => {
    try {
      await teacher_register(
        username,
        password,
        first_name,
        last_name,
        current_school,
        subjects_taught,
        current_state,
        grades_taught,
        years_of_experience
      );
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
      const user = getAuthenticatedTeacherUser();
      setTeacherUser(user);
    } catch (error) {
      clearTeacherUser();
    }
  }, []);

  return { loginTeacherUser, logoutTeacherUser, registerTeacherUser };
}

export default useMutationTeacherUser;
