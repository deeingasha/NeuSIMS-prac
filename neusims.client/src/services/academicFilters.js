import api from "./api";

export const academicFilters = {
  getAcademicYears: async () => {
    try {
      console.log("Fetching academic years..."); // Debug logging
      const response = await api.get(
        "http://localhost:5292/api/AcademicFilters/GetAcademicYears"
      );
      console.log("Academic years response:", response.data); // Debug logging
      // Transform the response data to match expected format
      return Array.isArray(response.data)
        ? response.data.map((year) => ({
            yearId: year.year,
            yearName: year.year,
            startDate: year.startDate,
            endDate: year.endDate,
            isDefault: year.isDefault,
          }))
        : [];
    } catch (error) {
      console.error("Academic years fetch error:", error);
      throw new Error("Failed to fetch academic years");
    }
  },

  getClasses: async () => {
    try {
      const response = await api.get("/AcademicFilters/GetClasses");
      // Transform the response data to match expected format
      return Array.isArray(response.data)
        ? response.data.map((cls) => ({
            classNo: cls.classNo,
            className: cls.className,
          }))
        : [];
    } catch (error) {
      console.error("Classes fetch error:", error);
      throw new Error("Failed to fetch classes");
    }
  },

  getStreams: async (classNo) => {
    try {
      const response = await api.get(`/AcademicFilters/GetStreams/${classNo}`);
      // Transform the response data to match expected format
      return Array.isArray(response.data)
        ? response.data.map((stream) => ({
            streamNo: stream.streamNo,
            streamName: stream.streamName,
            classNo: stream.classNo,
          }))
        : [];
    } catch (error) {
      console.error("Streams fetch error:", error);
      throw new Error(`Failed to fetch streams for class ${classNo}`);
    }
  },
};
