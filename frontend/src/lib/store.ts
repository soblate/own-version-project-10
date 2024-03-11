// import { PostWithUserData, User } from "./types";
import { User, SchoolUser, TeacherUser, Postings } from "./types";

// import { log } from "./logger";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  // posts: PostWithUserData[];
  user: User | null;
  teacherUser: TeacherUser | null;
  schoolUser: SchoolUser | null;
  schoolProfile: SchoolUser | null;

  schoolPostings: Postings[] | null,
  selectedPostingId: number | string | null,

  teacherPostings: Postings[] | null,

  // Add more state variables
};
type Action = {

  // Add more actions
  
  setUser: (user: User) => void;
  clearUser: () => void;

  setSchoolUser: (schoolUser: SchoolUser) => void;
  clearSchoolUser: () => void;

  setSchoolProfile: (schoolUser: SchoolUser) => void;
  clearSchoolProfile: () => void;

  setSchoolPostings: (posts: Postings[]) => void;
  // removeSchoolPostings: (id: number) => void;
  addSchoolPostings: (post: Postings) => void;
  // updateSchoolPostings: (id: number, updatedPost: Postings) => void;

  setSelectedPostingId: (id: number | string) => void;
  clearSelectedPostingId: () => void;
  setTeacherUser: (teacherUser: TeacherUser) => void;
  clearTeacherUser: () => void;

  setTeacherPostings: (posts: Postings[]) => void;

};
// define the initial state
const initialState: State = {
  // posts: [],
  user: null,
  schoolUser: null,
  schoolProfile: null,
  schoolPostings: null,
  selectedPostingId: null,
  teacherUser: null,
  teacherPostings: null
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,


    // setPosts: (posts) => set({ posts }),

    // removePost: (id) => {
    //   log.debug("Store's delete post is called with id =", id);
    //   log.debug("# posts before delete", get().posts.length);
    //   const newPosts = get().posts.filter((post) => post.id !== id);
    //   log.debug("# posts after delete", newPosts.length);
    //   set({ posts: newPosts });
    // },
    // addPost: (post) => {
    //   set({ posts: [post, ...get().posts] });
    // },
    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),

    setTeacherUser: (teacherUser) => set({ teacherUser }),

    clearTeacherUser: () => set({ teacherUser: null }),

    setSchoolUser: (schoolUser) => set({ schoolUser }),

    clearSchoolUser: () => set({ schoolUser: null }),
    // setSchoolId: (schoolId) => set({ schoolId }),
    // clearSchoolId: () => set({ schoolId: 0 }),

    setSchoolProfile: (schoolUser) => set({ schoolProfile: schoolUser }),

    clearSchoolProfile: () => set({ schoolProfile: null }),

    setSchoolPostings: (schoolPostings) => set({ schoolPostings: schoolPostings }),

    setTeacherPostings: (teacherPostings) => set({ teacherPostings: teacherPostings }),

    setSelectedPostingId: (selectedPostingId) => set({ selectedPostingId }),

    clearSelectedPostingId: () => set({ selectedPostingId: null }),

    // removeSchoolPostings: (id) => {
    //   // log.debug("Store's delete post is called with id =", id);
    //   // log.debug("# posts before delete", get().posts.length);
    //   const newPosts = get().posts.filter((post) => post.id !== id);
    //   // log.debug("# posts after delete", newPosts.length);
    //   set({ posts: newPosts });
    // },

    addSchoolPostings: (post) => {
      set({ schoolPostings: [post, ...get().schoolPostings] });
    },

    // updateSchoolPostings: (postId, updatedPost) => {
    //   const newPosts = get().posts.filter((post) => post.id !== postId);
    //   // const posts = get().posts.map( (post) => {
    //   //   if (post.id === postId) {
    //   //     return updatedPost;
    //   //   }
    //   //   return post;
    //   // });
    //   // set({ posts });
    //   set({ posts: [...newPosts, updatedPost] });

    // },


  })),
);
