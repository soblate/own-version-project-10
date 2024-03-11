// import SchoolAside from "@/components/aside";
// import Feed from "@/components/feed";
import TeacherJobBoard from "@/components/teacher-job-postings"
import HeaderNavBar from "@/components/teachers/teacher-header-nav-bar";
// import { useStore } from "@/lib/store";
const JobBoardTeacherView= () => {

  return (
    <>
        <HeaderNavBar />
      {/* <Feed /> */}
      { <TeacherJobBoard /> }
      {/* <SchoolAside /> */}

      {/* <Aside /> */}
    </>
  );
};

export default JobBoardTeacherView;