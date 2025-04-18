import axios from "../Axioscustum";
const getForumApi = () => {
    return axios.get("v1/forum/topics");
};

const createForumApi = (forumData) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Access Token:", accessToken);
  
    return axios.post(
      `v1/forum/topics`,
      {
        title: forumData.title,
        description: forumData.description,
        expireInHours: forumData.expireInHours,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  };
  const deleteForumApi = async (id_forum) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)

    return await axios.delete(`v1/forum/topics/${id_forum}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
};
const updateForumApi = async (id_forum, title,description) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken)
  return await axios.put(`v1/forum/topics/${id_forum}`, {title,description},
  {
      headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
      }
  });
};
export {
    getForumApi,
    createForumApi,
    updateForumApi,
    deleteForumApi
}