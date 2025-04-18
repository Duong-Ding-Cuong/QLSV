import axios from "../Axioscustum";
const getStudentApi = () => {
    return axios.get("v1/student");
};
const getStudentByIdApi = (id_student) => {
     return axios.get(`v1/student/${id_student}`);
};

export {
    getStudentApi,
    getStudentByIdApi
}