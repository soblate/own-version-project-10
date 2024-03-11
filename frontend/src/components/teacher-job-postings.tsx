"use client";
// import JobPosting from "@/components/job-postings";
import TeacherJobPosting from "@/components/teacher-jobboard-posting";

import "../App.css";
// import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
// import useMutationSchoolUser from "@/hooks/use-mutations-schools";
import useSchoolPostingQueryPosts from "@/hooks/use-mutations-school-postings";
import { Postings } from "@/lib/types";
import { useEffect } from "react";
//import JobPosting from "../components/job-posting";

export default function TeacherJobBoard() {
  // const navigate = useNavigate();
  //   const schoolProfile = useStore((state) => state.schoolProfile);

  const teacherPostings = useStore((state) => state.teacherPostings);

  //   const { getSchoolProfile } = useMutationSchoolUser();
  const { loadTeacherPostings } = useSchoolPostingQueryPosts();

    useEffect(() => {
      // Update the document title using the browser API
      // loadPostings();
      loadTeacherPostings();

    }, []);
  //const router = useRouter();

  // if (teacherPostings == null) {
  //   loadTeacherPostings();
  // }

  console.log(teacherPostings)
  console.log("hello")

  // console.log(schoolPostings);


  return (
    <>
      <div className="flex-center-screen">
        <div className="rounded-card">
          <div className="form">
            <h3 className="heading2 text-center">
              Welcome
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
                {teacherPostings &&
                  teacherPostings.map((posting: Postings) => (
                    <TeacherJobPosting params={posting} />
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
