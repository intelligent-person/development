import { useQuery } from "react-query";
import { tagsApi } from "../../api/api";

export const useFetchTagCount = (tag) => {
  return useQuery(["posts", tag], async () => {
    const { data } = await tagsApi.getTagCount(tag);
    return data;
  });
};
