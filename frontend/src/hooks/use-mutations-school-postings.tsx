import { useEffect, useState } from "react";
import { createPostings, deletePostings, fetchAllPostings, fetchPostingsById, fetchPostingsBySchool, updatedPostings } from "@/lib/api";

import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { Postings } from "@/lib/types";

function useSchoolPostingQueryPosts() {
  const { toast } = useToast();
  const posts = useStore((state) => state.schoolPostings);

  // const teacherPostings = useStore((state) => state.teacherPostings);

  const setTeacherPostings = useStore((state) => state.setTeacherPostings);

  const addSchoolPostings = useStore((state) => state.addSchoolPostings);
  // const removeSchoolPostings = useStore((state) => state.removeSchoolPostings);
  // const updateSchoolPostings = useStore((state) => state.updateSchoolPostings);

  const setSchoolPostings = useStore((state) => state.setSchoolPostings);
  const setSelectedPostingId = useStore((state) => state.setSelectedPostingId);
  const clearSelectedPostingId = useStore((state) => state.clearSelectedPostingId);
  const [post, setPost] = useState<Postings | null>(null);
  const user = useStore((state) => state.schoolUser);
  const userProfile = useStore((state) => state.schoolProfile);

  const loadPostings = async () => {
    try {
      if(userProfile) {
        const fetchedPosts = await fetchPostingsBySchool(userProfile.id);
        setSchoolPostings(fetchedPosts);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch posts",
        description:
          (error as Error).message ||
          "There was an error loading the posts. Please try again later.",
      });
    }
  };

  const loadTeacherPostings = async () => {
    try {
        const fetchedPosts = await fetchAllPostings();
        console.log(fetchedPosts)
        setTeacherPostings(fetchedPosts);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch posts",
        description:
          (error as Error).message ||
          "There was an error loading the posts. Please try again later.",
      });
    }
  };



  const addPostings = async (experience: string, title:string,   salary_est: string,
    start_date: string,
    city: string,
    state: string) => {
    try {
        if(userProfile) {
          console.log(experience)
          console.log(title)
          console.log(salary_est)
          console.log(start_date)
          console.log(city)
          const newPosting = await createPostings(userProfile.id, experience, title, salary_est, start_date, city, state);
        //   console.log(fetchedPosts);
        console.log(newPosting)
        addSchoolPostings(newPosting);

        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to fetch posts",
          description:
            (error as Error).message ||
            "There was an error loading the posts. Please try again later.",
        });
      }
    }


    const updatePostings = async (id: number | string, experience: string, title:string, school_id: number,   salary_est: string,
      start_date: string,
      city: string,
      state: string) => {
        try {
            if(userProfile) {
              await updatedPostings(id, experience, title, school_id, salary_est, start_date, city, state);
            //   console.log(fetchedPosts);
            // console.log(newPosting)
            // console.log("whatsuppp")
            //   updateSchoolPostings(userProfile.id,newPosting);
              loadPostings();
            }
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Failed to fetch posts",
              description:
                (error as Error).message ||
                "There was an error loading the posts. Please try again later.",
            });
          }
        }

    const deleteSchoolPostings = async (postingId: number) => {
    try {
      console.log(postingId)
      await deletePostings(postingId);
      // removeSchoolPostings(postingId);
      loadPostings();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the post",
        description:
          (error as Error).message ||
          "There was an error deleting the post. Please try again later.",
      });
    }
  };




//   };

  const loadPosting = async (id: string) => {
    let post = null;
    try {
      console.log(id)
      post = await fetchPostingsById(id);
      // console.log(post)
      setPost(post);
      setSelectedPostingId(post.id);
    } catch (error) {
      setPost(null);
      clearSelectedPostingId();
      toast({
        variant: "destructive",
        title: "Failed to fetch posts",
        description:
          (error as Error).message ||
          "There was an error loading the posts. Please try again later.",
      });
    }
  };
  

  

  useEffect(() => {
    loadPostings();
  }, [user]);

  return { posts, loadPostings, addPostings, deleteSchoolPostings, post, loadPosting, updatePostings, loadTeacherPostings
    // , post, loadPost 
  };
}

export default useSchoolPostingQueryPosts;