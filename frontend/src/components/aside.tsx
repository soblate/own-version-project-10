import { useStore } from "@/lib/store";
import { TeacherLogoutDialog } from "./auth/teacher-logout-dialog";
import { TeacherRegisterDialog } from "./auth/teacher-register-dialog";
import { TeacherLoginDialog } from "./auth/teacher-login-dialog";
// import CodeButton from "./code-button";

const TeacherAside = () => {
  const teacherUser = useStore((state) => state.teacherUser);
  console.log(teacherUser);
  return (
    <div className="flex flex-col gap-5 p-4 right-0">
      {teacherUser ? <TeacherLogoutDialog /> : <TeacherLoginDialog />}
      {!teacherUser && <TeacherRegisterDialog />}
    </div>
  );
};

export default TeacherAside;
