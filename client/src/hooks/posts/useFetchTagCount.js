import { useQuery } from "react-query";
import { postsAPI } from "../../api/api";

export const useFetchTagCount = (tag) => {
  return useQuery(["posts", tag], async () => {
    const { data } = await postsAPI.getTagCount(tag);
    return data;
  });
};
