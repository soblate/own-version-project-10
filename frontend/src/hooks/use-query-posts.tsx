// import { useEffect, useState } from "react";
// // import { fetchPostById, fetchPosts, fetchPostsByUser } from "@/lib/api";
// import { fetchPostById, fetchPostsByUser } from "@/lib/api";

// import { useStore } from "@/lib/store";
// import { useToast } from "@/components/ui/use-toast";
// import { PostWithUserData } from "@/lib/types";

// function useQueryPosts() {
//   const { toast } = useToast();
//   const posts = useStore((state) => state.posts);
//   const setPosts = useStore((state) => state.setPosts);
//   const setSelectedPostId = useStore((state) => state.setSelectedPostId);
//   const clearSelectedPostId = useStore((state) => state.clearSelectedPostId);
//   const [post, setPost] = useState<PostWithUserData | null>(null);
//   const user = useStore((state) => state.user);

//     const loadPosts = async () => {
//     try {
//       if(user) {
//         const fetchedPosts = await fetchPostsByUser(user.sub);
//         setPosts(fetchedPosts);
//       }
//       else {
//         setPosts([])
//       }
      
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Failed to fetch posts",
//         description:
//           (error as Error).message ||
//           "There was an error loading the posts. Please try again later.",
//       });
//     }
//   };

//   const loadPost = async (id: string) => {
//     let post = null;
//     try {
//       post = await fetchPostById(id);
//       setPost(post);
//       setSelectedPostId(post.id);
//     } catch (error) {
//       setPost(null);
//       clearSelectedPostId();
//       toast({
//         variant: "destructive",
//         title: "Failed to fetch posts",
//         description:
//           (error as Error).message ||
//           "There was an error loading the posts. Please try again later.",
//       });
//     }
//   };
  

  

//   useEffect(() => {
//     loadPosts();
//   }, [user]);

//   return { posts, post, loadPost };
// }

// export default useQueryPosts;