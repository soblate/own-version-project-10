"use client";

// import React, { useState } from "react";
import "../App.css";
import JobPostingSchoolButtons from "./job-posting-school-buttons";
// import JobPostingTeacherButtons from "./job-posting-teacher-buttons";

export default function JobPosting({ params }: { params: { id: number, experience: string, title:string, school_id: number,   salary_est: string,
  start_date: string,
  city: string,
  state: string } }) {


  return (

    <>
      <div className="list">
        <div>
          <p className="text1">{params.start_date}</p>
          <p className="heading3">{params.title}</p>
          <p className="text1">{params.city}, {params.state}</p>
          <p className="text1">{params.experience}</p>
        </div>
        <div>
          {<JobPostingSchoolButtons params={params}/>}
        </div>
      </div>
    </>
  );
}
