import ButtonCard from "@/components/button-card";
import HeaderNavBar from "@/components/teachers/teacher-header-nav-bar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";

const SignedUpTeacher = () => {
  const navigate = useNavigate();
  const teacherUser = useStore((state) => state.teacherUser);
  function goToJobBoard() {
    try {
      navigate("/jobboardteacherview"); // TODO: Change to jobboardteacherview after adding teacher-specific view
    } catch (error) {
      alert("Could not navigate to job board. Please try again.");
    }
  }

  function goToProfile() {
    try {
      navigate("/teacheraccountview"); // TODO: Change to jobboardteacherview after adding teacher-specific view
    } catch (error) {
      alert("Could not navigate to profile. Please try again.");
    }
  }

  return (
    <div className="w-full">
      <HeaderNavBar />
      {teacherUser ? (
        <div className="flex flex-col justify-center items-center pt-[6rem]">
          <div>
            <h1 className="text-h1">Welcome to the TeachU Network!</h1>
            <div className="flex justify-center text-subtitle py-[1rem]">
              Choose your next action
            </div>
          </div>
          <div className="flex flex-row space-x-2 py-[3rem]">
            <ButtonCard
              title="Find a Job"
              imgPath="/assets/icon-work.svg"
              description="Search for jobs at schools that match your needs"
              onClick={goToJobBoard}
            />
            <ButtonCard
              title="Build Your Profile"
              imgPath="/assets/icon-profile-build.svg"
              description="Finish your profile to increase your chances of getting hired"
              onClick={goToProfile}
            />
          </div>
          <Button variant="secondary" size="lg">
            Go to My Dashboard
          </Button>
        </div>
      ) : (
        "please sign in to view your teacher dashboard "
      )}
    </div>
  );
};

export default SignedUpTeacher;
