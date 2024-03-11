"use client";
import "../App.css";
import useSchoolPostingQueryPosts from "@/hooks/use-mutations-school-postings";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SchoolAside from "@/components/school-aside";

//import JobPosting from "../components/job-posting";
// const { postId } = useParams()
export default function DetailsJobPosting() {
  const { postId } = useParams();

  const { post, loadPosting } = useSchoolPostingQueryPosts();

  console.log(postId);
  useEffect(() => {
    if (postId) {
      loadPosting(postId);
    }
  }, [postId]);

  console.log(post);
  //const router = useRouter();
  async function handleClick() {
    try {
      //await createPost(position, salary, start, description, attachments);
      // TODO: route to application form
      //router.push(`...`);
    } catch (error) {
      console.log(error);
      alert("Could not create job post. Please try again.");
    }
  }

  return (
    <div>
      <div className="flex float-right w-[300px]">
          <SchoolAside />
        </div>
      <div className="flex-center-screen">

        <div className="rounded-card">
          <div className="form">
            <h3 className="heading2 text-center"> {post?.title} </h3>
            <p className="heading1 text-center"> {post?.experience} </p>
            {/* <p className="text1">School name</p> */}
            <p className="text1">{post?.city}, {post?.state}</p>
          </div>
          <div className="form">
            <div className="bottom-margin">
              <label htmlFor="eventname" className="label1">
                POSITION TITLE
              </label>
              <p className="text1">{post?.title}</p>
            </div>
            <div className="bottom-margin">
              <label htmlFor="eventdescrip" className="label1">
                SALARY ESTIMATE
              </label>
              <p className="text1">{post?.salary_est}</p>
            </div>
            <div className="bottom-margin">
              <label htmlFor="eventdate" className="label1">
                START DATE
              </label>
              <p className="text1">{post?.start_date}</p>
            </div>
            <button className="button" onClick={handleClick}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
