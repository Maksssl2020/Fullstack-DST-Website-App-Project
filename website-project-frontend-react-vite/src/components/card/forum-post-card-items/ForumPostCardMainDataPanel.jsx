import React, { useContext, useState } from "react";
import UserIcon from "../../header/icons/UserIcon.jsx";
import EditIcon from "../../../icons/EditIcon.jsx";
import { AuthContext } from "../../../helpers/provider/AuthProvider.jsx";
import DeleteIcon from "../../../icons/DeleteIcon.jsx";
import { useNavigate } from "react-router-dom";
import DeleteWarningModal from "../../modal/DeleteWarningModal.jsx";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { handlePostDelete } from "../../../helpers/api-integration/ForumPostsHandling.js";
import Spinner from "../../universal/Spinner.jsx";
import {
  fetchUserDisplayData,
  fetchUserIdByUsername,
} from "../../../helpers/api-integration/UserDataHandling.js";
import { DateParser, DateTimeParser } from "../../../helpers/Date.js";

const ForumPostCardMainDataPanel = ({ postData }) => {
  const { username, role } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { id, title, content, creationDate, postType, authorId } = postData;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const { data: userDisplayData, isLoading: fetchingUserDisplayData } =
    useQuery(["forumPostUserAvatar", authorId], () =>
      fetchUserDisplayData(authorId),
    );

  const { mutate, isLoading: deletingPost } = useMutation({
    mutationFn: handlePostDelete,
    onSuccess: () => {
      queryClient.invalidateQueries("forumPostsData");
    },
    onError: (error) => console.log(error),
  });

  const handleDeleteClick = () => {
    setOpenModal(true);
  };

  const handleCancelDeleteClick = () => {
    setOpenModal(false);
  };

  if (deletingPost || fetchingUserDisplayData) {
    return <Spinner />;
  }

  return (
    <div className="w-[50%] justify-between h-full rounded-2xl flex flex-col items-center p-4 bg-custom-gray-100">
      <div className="w-full h-[50px] flex text-white font-bold items-center justify-center text-4xl rounded-full bg-custom-blue-400">
        {title}
      </div>
      <textarea
        readOnly
        className="w-full resize-none focus:outline-none hover:cursor-auto p-4 text-xl h-[60%] bg-custom-gray-200 rounded-xl"
      >
        {content}
      </textarea>
      <div className="w-full relative flex flex-col h-[100px]">
        <p className="w-[55%] text-white flex justify-center absolute rounded-2xl right-0 h-[75px] pb-4 text-2xl font-bold bg-custom-blue-200">
          {DateTimeParser(creationDate)}
        </p>
        <div className="z-10 text-white text-4xl font-bold mt-auto bg-custom-blue-400 flex px-2 items-center h-[65px] rounded-full">
          <p className="bg-white text-black mr-4 border-2 border-custom-blue-400 rounded-full flex justify-center items-center size-14">
            {userDisplayData && postType !== "ANONYMOUS" ? (
              <img
                className="rounded-full inset-0 object-cover size-full"
                src={`data:image/png;base64,${userDisplayData.avatar}`}
                alt={userDisplayData.username}
              />
            ) : (
              <UserIcon size={"size-8"} />
            )}
          </p>
          {postType === "PUBLIC" ? userDisplayData.username : "Anonimowy"}
          <div className="ml-auto flex items-center gap-2">
            {username === userDisplayData.username && (
              <button
                onClick={() => navigate(`/forum/edit-post/${id}`)}
                className="text-black rounded-full size-10 flex justify-center items-center bg-white"
              >
                <EditIcon size={"size-8"} />
              </button>
            )}
            {(username === userDisplayData.username || role === "ADMIN") && (
              <button
                onClick={handleDeleteClick}
                className="text-black rounded-full size-10 flex justify-center items-center bg-white"
              >
                <DeleteIcon size={"size-8"} />
              </button>
            )}
          </div>
        </div>
      </div>
      {openModal && (
        <DeleteWarningModal
          itemId={id}
          handleDeleteFunc={mutate}
          onClose={handleCancelDeleteClick}
        />
      )}
    </div>
  );
};

export default ForumPostCardMainDataPanel;
