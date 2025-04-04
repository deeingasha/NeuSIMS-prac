import api from "./api";

export const studentService = {
  getAllStudents: async (params) => {
    const response = await api.get("/apistudents", { params });
    return response.data;
  },

  getStudentById: async (id) => {
    const response = await api.get(`api/students/${id}`);
    return response.data;
  },

  createStudent: async (studentData) => {
    const response = await api.post("api/students", studentData);
    return response.data;
  },

  updateStudent: async (id, studentData) => {
    const response = await api.put(`api/students/${id}`, studentData);
    return response.data;
  },

  deleteStudent: async (id) => {
    await api.delete(`api/students/${id}`);
  },
};
