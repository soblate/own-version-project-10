import { useStore } from "@/lib/store";
import { TeacherLogoutDialog } from "./auth/teacher-logout-dialog";
import { TeacherRegisterDialog } from "./auth/teacher-register-dialog";
import { TeacherLoginDialog } from "./auth/teacher-login-dialog";
import NewViewButton from "./new-view-button";
// import CodeButton from "./code-button";

const NewAside = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="flex flex-col gap-5 p-4">
      {user ? <TeacherLogoutDialog /> : <TeacherLoginDialog />}
      {!user && <TeacherRegisterDialog />}
      {<NewViewButton />}
    </div>
  );
};

export default NewAside;
