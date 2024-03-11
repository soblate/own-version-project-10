"use client";
import JobPosting from "@/components/job-postings";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import useMutationSchoolUser from "@/hooks/use-mutations-schools";
import useSchoolPostingQueryPosts from "@/hooks/use-mutations-school-postings";
import { Postings } from "@/lib/types";
import { useEffect } from "react";
//import JobPosting from "../components/job-posting";

export default function SchoolJobBoard() {
  const navigate = useNavigate();
  const schoolUser: any = useStore((state) => state.schoolUser);
  const schoolProfile = useStore((state) => state.schoolProfile);
  //   const schoolProfile = useStore((state) => state.schoolProfile);

  const schoolPostings = useStore((state) => state.schoolPostings);


  const { getSchoolProfile } = useMutationSchoolUser();
  const { loadPostings } = useSchoolPostingQueryPosts();

  useEffect(() => {
    // Update the document title using the browser API
    // loadPostings();
  }, [loadPostings]);
  //const router = useRouter();

  if (!schoolProfile && schoolUser) {
    getSchoolProfile(schoolUser?.sub);
  }

  if (!schoolPostings && schoolUser) {
    loadPostings();
  } 

  // console.log(schoolPostings);

  function handleClick() {
    try {
      // TODO: push to create-job-post-view on click
      //router.push("../create-event");
      navigate("/createjobpost");
    } catch (error) {
      alert("Could not create event. Please try again.");
    }
  }

  return (
    <>
      <button
        className="button"
        onClick={handleClick}
        style={{
          position: "fixed",
          top: "20px",
          right: "250px",
          width: "135px",
        }}
      >
        Create Posting
      </button>
      <div className="flex-center-screen">
        <div className="rounded-card">
          <div className="form">
            <h3 className="heading2 text-center">
              Welcome {schoolProfile?.username}
            </h3>
          </div>
          <div className="form">
            <div className="bottom-margin">
              <label htmlFor="eventlist" className="label1">
                POSTINGS
              </label>
              {/* // TODO: implement map and pass params for post information, user */}
              {/* // TODO: boolean determines which buttons show up */}
              <div className="rounded-box">
                
                {schoolPostings && schoolPostings.map((posting: Postings) => (
                  <JobPosting
                    params={posting}
                  />
                ))}



                {/* { schoolPostings.map((posting: Postings) => { {posting.id}
                }) } */}
                {/* {schoolPostings[0].id} */}
                {/* <JobPosting
                  id={schoolPostings[0].id}
                  experience={schoolPostings[0].experience}
                  title={schoolPostings[0].title}
                /> */}
                {/* <JobPosting
                  params={{
                    user: false,
                  }}
                />
                <JobPosting
                  params={{
                    user: false,
                  }} 
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
