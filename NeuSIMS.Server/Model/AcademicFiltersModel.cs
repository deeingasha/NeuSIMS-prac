namespace NeuSIMS.Server.Models
{
    public class AcademicYear
    {
        public string Year { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsDefault { get; set; }
    }

    public class ClassInfo
    {
        public int ClassNo { get; set; }
        public string ClassName { get; set; }
    }

    public class StreamInfo
    {
        public int StreamNo { get; set; }
        public string StreamName { get; set; }
        public int ClassNo { get; set; }
    }

    public class StudentClassAllocation
    {
        public int AllocationId { get; set; }
        public int ClassNo { get; set; }
        public int StreamNo { get; set; }
        public string Year { get; set; }
        public int RegNo { get; set; }
        public bool Status { get; set; }
        public bool FreshFeeStatus { get; set; }
    }
}