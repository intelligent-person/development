import { useQuery } from "react-query";
import { authAPI } from "../../api/api";

export const useAuthUser = (id) => {
  return useQuery(["Auth User"], async () => {
    const { data } = await authAPI.getAuth(id);
    return data;
  });
};
