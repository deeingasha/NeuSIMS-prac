import { useContext } from "react";
import { AcademicContext } from "@context/AcademicContext";

export function useAcademic() {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error("useAcademic must be used within an AcademicProvider");
  }
  return context;
}
