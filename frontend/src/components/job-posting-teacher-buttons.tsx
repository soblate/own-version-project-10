import "../App.css";
import { useNavigate } from "react-router-dom";
// import useSchoolPostingQueryPosts from "@/hooks/use-mutations-school-postings";
// import { SchoolJobEditDialog } from "./school-job-edit-dialog";

export default function JobPostingTeacherButtons({ params }: { params: { id: number, experience: string, title:string, school_id: number,   salary_est: string,
  start_date: string,
  city: string,
  state: string } }) {
  const navigate = useNavigate();


  // const { deleteSchoolPostings } = useSchoolPostingQueryPosts();
  function viewPosting() {
    try {
      // TODO: push to create-job-post-view on click
      //router.push("../create-event");
      navigate("/teacherdetailsjobposting/" + params.id);
    } catch (error) {
      alert("Could not create event. Please try again.");
    }
  }
  // console.log(params)
  return (
    <>
      <button
        className="button"
        onClick={viewPosting}
        style={{
          width: "70px",
        }}
      >
        View
      </button>

    </>
  );
}
