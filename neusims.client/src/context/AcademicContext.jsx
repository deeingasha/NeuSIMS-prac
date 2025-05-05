// import { createContext, useState, useEffect } from "react";
// import { academicFilters } from "@services/academicFilters";

// export const AcademicContext = createContext(null);

// export function AcademicProvider({ children }) {
//   const [academicYears, setAcademicYears] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [streams, setStreams] = useState({}); // Keyed by classNo
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch streams for a specific class
//   const fetchStreamsForClass = async (classNo) => {
//     try {
//       const streamList = await academicFilters.getStreams(classNo);
//       setStreams((prev) => ({
//         ...prev,
//         [classNo]: streamList,
//       }));
//     } catch (err) {
//       console.error(`Failed to fetch streams for class ${classNo}:`, err);
//     }
//   };
//   const loadAcademicData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Debug logging
//       console.log("Starting to fetch academic data");

//       // Fetch years and classes in parallel
//       const [yearsList, classList] = await Promise.all([
//         academicFilters.getAcademicYears(),
//         academicFilters.getClasses(),
//       ]);

//       // Debug logging
//       console.log("Years response:", yearsList);
//       console.log("Classes response:", classList);

//       // Validate and set academic years
//       if (!Array.isArray(yearsList)) {
//         throw new Error("Invalid academic years data format");
//       }
//       setAcademicYears(yearsList);

//       // Validate and set classes
//       if (!Array.isArray(classList)) {
//         throw new Error("Invalid classes data format");
//       }
//       setClasses(classList);

//       // Pre-load streams for all classes
//       const streamsByClass = {};
//       await Promise.all(
//         classList.map(async (cls) => {
//           try {
//             const streamList = await academicFilters.getStreams(cls.classNo);
//             streamsByClass[cls.classNo] = streamList;
//           } catch (streamErr) {
//             console.warn(
//               `Failed to load streams for class ${cls.classNo}:`,
//               streamErr
//             );
//             streamsByClass[cls.classNo] = [];
//           }
//         })
//       );
//       setStreams(streamsByClass);
//     } catch (err) {
//       setError(err.message);
//       console.error("Failed to load academic data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     loadAcademicData();
//   }, []);

//   const value = {
//     academicYears,
//     classes,
//     streams,
//     loading,
//     error,
//     fetchStreamsForClass, // Expose method to fetch streams for a specific class
//     refreshData: loadAcademicData, // Expose method to refresh all data
//   };

//   return (
//     <AcademicContext.Provider value={value}>
//       {children}
//     </AcademicContext.Provider>
//   );
// }
import { createContext, useState, useEffect } from "react";
import { academicFilters } from "@services/academicFilters";

export const AcademicContext = createContext(null);

export function AcademicProvider({ children }) {
  const [academicYears, setAcademicYears] = useState([]);
  const [classes, setClasses] = useState([]);
  const [streams, setStreams] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAcademicData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Starting academic data load");

      // Fetch academic years
      const years = await academicFilters.getAcademicYears();
      console.log("📅 Fetched years:", years);
      setAcademicYears(years);

      // Fetch classes
      const classList = await academicFilters.getClasses();
      console.log("📚 Fetched classes:", classList);
      setClasses(classList);

      // Only fetch streams if we have classes
      if (classList.length > 0) {
        const streamsByClass = {};
        for (const cls of classList) {
          const streams = await academicFilters.getStreams(cls.classNo);
          streamsByClass[cls.classNo] = streams;
        }
        setStreams(streamsByClass);
        console.log("🔄 Streams loaded for all classes");
      }
    } catch (err) {
      console.error("❌ Academic data load failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAcademicData();
  }, []);

  const value = {
    academicYears,
    classes,
    streams,
    loading,
    error,
    refreshData: loadAcademicData,
  };

  return (
    <AcademicContext.Provider value={value}>
      {children}
    </AcademicContext.Provider>
  );
}
