import axios from "../Axioscustum";
const getCommentApi = (id_post) => {
    return axios.get(`v1/comment/${id_post}`);
};
const postCommentApi = (postId, content, authorId) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)

    return axios.post(`v1/comment`, {
        postId,
        content,
        author: {
            _id: authorId
        }
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
};
const deleteCommentApi = async (id_comment) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)

    return await axios.delete(`v1/comment/${id_comment}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
};
const updateCommentApi = async (id_comment, content) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken)
    return await axios.put(`v1/comment/${id_comment}`, {content},
    {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
};
export {
    getCommentApi,
    postCommentApi,
    deleteCommentApi,
    updateCommentApi
}
