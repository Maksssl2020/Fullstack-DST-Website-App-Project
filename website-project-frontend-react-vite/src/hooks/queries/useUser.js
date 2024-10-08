import { useQuery } from "react-query";
import { fetchUserById } from "../../helpers/api-integration/UserDataHandling.js";
import useAuthentication from "./useAuthentication.js";

function UseUser(userId) {
  const { isAuthenticated } = useAuthentication();

  const { data: user, isLoading: fetchingUser } = useQuery(
    ["userData", userId],
    () => {
      if (isAuthenticated) {
        return fetchUserById(userId);
      }
    },
  );

  return { user, fetchingUser };
}

export default UseUser;
