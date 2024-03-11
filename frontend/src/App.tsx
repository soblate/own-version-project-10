// import Feed from "./components/feed";
import { Toaster } from "./components/ui/toaster";
// import { LoginDialog } from "./components/login-dialog";
import { useStore } from "./lib/store";
// import { LogoutDialog } from "./components/logout-dialog";
// import { RegisterDialog } from "./components/register-dialog";
import { useEffect } from "react";
import {
  getAuthenticatedUserToken,
  isTokenExpired,
  removeAuthenticatedUserToken,
} from "./lib/auth";
import { useToast } from "./components/ui/use-toast";
// import Aside from "./components/aside";
import MainView from "./views/main-view";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./views/error-page";
// import PostView from "./views/post-view";
import NewView from "./views/new-view";
import SignedUpTeacher from "./views/signed-up-teacher";
import CreateJobPostView from "./views/create-job-post-view";
import JobBoardSchoolView from "./views/job-board-school-view";
import DetailsJobPosting from "./views/details-job-posting";
import TeacherAccountView from "./views/teacher-account-view";
import JobBoardTeacherView from "./views/job-board-teacher-view";
import TeacherDetailsJobPosting from "./views/teacher-details-job-posting";
// import SchoolAccountView from "./views/school-account-view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/newpage",
    element: <NewView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/createjobpost",
    element: <CreateJobPostView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/jobboardschoolview",
    element: <JobBoardSchoolView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/jobboardteacherview",
    element: <JobBoardTeacherView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/detailsjobposting/:postId",
    element: <DetailsJobPosting />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/teacherdetailsjobposting/:postId",
    element: <TeacherDetailsJobPosting />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/schoolaccountview",
    element: <JobBoardSchoolView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/teacheraccountview",
    element: <TeacherAccountView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/posts/:postId",
    element: <MainView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signed-up-teacher",
    element: <SignedUpTeacher />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  // const user = useStore((state) => state.user);
  const clearTeacherUser = useStore((state) => state.clearTeacherUser);
  const clearSchoolUser = useStore((state) => state.clearSchoolUser);
  const { toast } = useToast();

  useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        removeAuthenticatedUserToken();
        clearTeacherUser();
        clearSchoolUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
