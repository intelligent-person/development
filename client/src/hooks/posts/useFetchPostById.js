import { useQuery } from "react-query";
import { postsAPI } from "../../api/api";
import { queryClient } from "../queryClient";

export const useFetchPostById = (postId) => {
  return useQuery(["posts", `PostId: ${postId}`], async () => {
    const { data } = await postsAPI.getPost(postId);
    const viewed = queryClient.getQueryData(["posts", `PostId: ${postId}`]);
    !viewed && (await postsAPI.setPostView(postId));
    return data;
  });
};
