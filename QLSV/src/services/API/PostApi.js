import axios from "../Axioscustum";
const getPostApi = () => {
    return axios.get("v1/post");
};
const getPostByIdApi = (id_post) => {
    return axios.get(`/v1/post/${id_post}`);
};
const createPostApi = (formData) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("Access Token:", accessToken);
  return axios.post(`/v1/post`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data", 
    },
  });
};
  const deletePostApi = async (id_post) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)

    return await axios.delete(`v1/post/${id_post}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
};
const updatePostApi = async (id_post, title,content) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken)
  return await axios.put(`v1/post/${id_post}`, {title,content},
  {
      headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
      }
  });
};
export {
    getPostApi,
    getPostByIdApi,
    createPostApi,
    deletePostApi,
    updatePostApi
}