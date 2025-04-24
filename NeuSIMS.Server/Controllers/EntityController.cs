using Microsoft.AspNetCore.Mvc;
using System.Data;
using NeuSIMS.Server.Models;
using Microsoft.Data.SqlClient;

namespace NeuSIMS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntityController : Controller
    {
        IConfiguration _config;
        private readonly string _connectionString;

        public EntityController(IConfiguration config)

        {
            _config = config;
            // Get connection string once in constructor
            _connectionString = _config.GetSection("Configuration")?["ConnectionString"]
               ?? throw new InvalidOperationException("Connection string 'ConnectionString' not found in configuration.");
        }


        // [HttpGet("action"), Route("SaveEntity")]
        [HttpPost("SaveEntity")]


        public IActionResult SaveEntity([FromBody] Entity entity)
        {
            string connStr = _config.GetSection("Configuration").GetSection("ConnectionString").Value;

            using (SqlConnection conn = new SqlConnection(connStr))
            {
                conn.Open();

                // Get next EntityNo
                int EntityNo1;
                using (var cmd2 = new SqlCommand("SELECT ISNULL(MAX(pn_Entity_No), 0) AS maxEntityNo FROM dbo.m_Student_Entity", conn))
                {
                    cmd2.CommandType = CommandType.Text;
                    using (SqlDataReader reader = cmd2.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var maxEntityNo = reader["maxEntityNo"];
                            EntityNo1 = (maxEntityNo != DBNull.Value ? Convert.ToInt32(maxEntityNo) : 0) + 1;
                        }
                        else
                        {
                            EntityNo1 = 1; // Default if no records exist
                        }
                    }
                }

                entity.EntityNo = EntityNo1;

                // Execute SaveEntity stored procedure
                using (var cmd = new SqlCommand("SaveEntity", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.Add("@EntityNo", SqlDbType.Int).Value = entity.EntityNo;
                    cmd.Parameters.Add("@Title", SqlDbType.VarChar).Value = entity.Title;
                    cmd.Parameters.Add("@FName", SqlDbType.VarChar).Value = entity.FName;
                    cmd.Parameters.Add("@MName", SqlDbType.VarChar).Value = entity.MName;
                    cmd.Parameters.Add("@LName", SqlDbType.VarChar).Value = entity.LName;
                    cmd.Parameters.Add("@IdType", SqlDbType.VarChar).Value = entity.IdType;
                    cmd.Parameters.Add("@IdNo", SqlDbType.VarChar).Value = entity.IdNo;
                    cmd.Parameters.Add("@DOB", SqlDbType.DateTime).Value = entity.DOB;
                    cmd.Parameters.Add("@Sex", SqlDbType.VarChar).Value = entity.Sex;
                    cmd.Parameters.Add("@Disability", SqlDbType.VarChar).Value = entity.Disability;
                    cmd.Parameters.Add("@Guardian1", SqlDbType.VarChar).Value = entity.Guardian1;
                    cmd.Parameters.Add("@Relation1", SqlDbType.VarChar).Value = entity.Relation1;
                    cmd.Parameters.Add("@Guardian2", SqlDbType.VarChar).Value = entity.Guardian2;
                    cmd.Parameters.Add("@Relation2", SqlDbType.VarChar).Value = entity.Relation2;
                    cmd.Parameters.Add("@PoBox", SqlDbType.VarChar).Value = entity.PoBox;
                    cmd.Parameters.Add("@Address1", SqlDbType.VarChar).Value = entity.Address1;
                    cmd.Parameters.Add("@Address2", SqlDbType.VarChar).Value = entity.Address2;
                    cmd.Parameters.Add("@PhoneNo2", SqlDbType.VarChar).Value = entity.PhoneNo2;
                    cmd.Parameters.Add("@EmailId", SqlDbType.VarChar).Value = entity.EmailId;
                    cmd.Parameters.Add("@Remark", SqlDbType.VarChar).Value = entity.Remark;
                    cmd.Parameters.Add("@UpdatedUser", SqlDbType.VarChar).Value = entity.UpdatedUser;
                    cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = entity.UpdatedDate;
                    cmd.Parameters.Add("@CountryNo", SqlDbType.Int).Value = entity.CountryNo;
                    cmd.Parameters.Add("@ProvinceNo", SqlDbType.Int).Value = entity.ProvinceNo;
                    cmd.Parameters.Add("@AreaNo", SqlDbType.Int).Value = entity.AreaNo;
                    cmd.Parameters.Add("@Year", SqlDbType.VarChar).Value = entity.Year;
                    cmd.Parameters.Add("@DOJ", SqlDbType.DateTime).Value = entity.DOJ;
                    cmd.Parameters.Add("@Boarding", SqlDbType.VarChar).Value = entity.Boarding;
                    cmd.Parameters.Add("@Nationality", SqlDbType.VarChar).Value = entity.Nationality;
                    //  cmd.Parameters.Add("@ImgStudent", SqlDbType.Image).Value = entity.ImgStudent;
                    cmd.Parameters.Add("@PrevInstitute", SqlDbType.VarChar).Value = entity.PrevInstitute;
                    cmd.Parameters.Add("@LastAttended", SqlDbType.VarChar).Value = entity.LastAttended;
                    cmd.Parameters.Add("@PrevRemark", SqlDbType.VarChar).Value = entity.PrevRemark;
                    cmd.Parameters.Add("@StatusCode", SqlDbType.Int).Value = entity.StatusCode;
                    cmd.Parameters.Add("@Guardian1WTel", SqlDbType.VarChar).Value = entity.Guardian1WTel;
                    cmd.Parameters.Add("@Guardian2WTel", SqlDbType.VarChar).Value = entity.Guardian2WTel;
                    cmd.Parameters.Add("@GuardianPhone1", SqlDbType.VarChar).Value = entity.GuardianPhone1;
                    cmd.Parameters.Add("@GuardianPhone2", SqlDbType.VarChar).Value = entity.GuardianPhone2;
                    cmd.Parameters.Add("@Guardian1Email", SqlDbType.VarChar).Value = entity.Guardian1Email;
                    cmd.Parameters.Add("@Guardian2Email", SqlDbType.VarChar).Value = entity.Guardian2Email;
                    cmd.Parameters.Add("@Guardian1Occupation", SqlDbType.VarChar).Value = entity.Guardian1Occupation;
                    cmd.Parameters.Add("@Guardian2Occupation", SqlDbType.VarChar).Value = entity.Guardian2Occupation;
                    cmd.Parameters.Add("@Guardian1Company", SqlDbType.VarChar).Value = entity.Guardian1Company;
                    cmd.Parameters.Add("@Guardian2Company", SqlDbType.VarChar).Value = entity.Guardian2Company;
                    cmd.Parameters.Add("@Guardian1CompanyAddress", SqlDbType.VarChar).Value = entity.Guardian1CompanyAddress;
                    cmd.Parameters.Add("@Guardian2CompanyAddress", SqlDbType.VarChar).Value = entity.Guardian2CompanyAddress;
                    cmd.Parameters.Add("@Guardian1Firstname", SqlDbType.VarChar).Value = entity.Guardian1Firstname;
                    cmd.Parameters.Add("@Guardian1Lastname", SqlDbType.VarChar).Value = entity.Guardian1Lastname;
                    cmd.Parameters.Add("@Guardian2Firstname", SqlDbType.VarChar).Value = entity.Guardian2Firstname;
                    cmd.Parameters.Add("@Guardian2Lastname", SqlDbType.VarChar).Value = entity.Guardian2Lastname;
                    cmd.Parameters.Add("@Guardian1IdNo", SqlDbType.VarChar).Value = entity.Guardian1IdNo;
                    cmd.Parameters.Add("@Guardian2IdNo", SqlDbType.VarChar).Value = entity.Guardian2IdNo;
                    cmd.Parameters.Add("@Guardian1Tel1", SqlDbType.VarChar).Value = entity.Guardian1Tel1;
                    cmd.Parameters.Add("@Guardian2Tel1", SqlDbType.VarChar).Value = entity.Guardian2Tel1;
                    cmd.Parameters.Add("@Guardian1Fax", SqlDbType.VarChar).Value = entity.Guardian1Fax;
                    cmd.Parameters.Add("@Guardian2Fax", SqlDbType.VarChar).Value = entity.Guardian2Fax;
                    cmd.Parameters.Add("@Guardian1Residence", SqlDbType.VarChar).Value = entity.Guardian1Residence;
                    cmd.Parameters.Add("@Guardian2Residence", SqlDbType.VarChar).Value = entity.Guardian2Residence;
                    cmd.Parameters.Add("@Guardian1Email2", SqlDbType.VarChar).Value = entity.Guardian1Email2;
                    cmd.Parameters.Add("@Guardian2Email2", SqlDbType.VarChar).Value = entity.Guardian2Email2;
                    cmd.Parameters.Add("@Transport", SqlDbType.VarChar).Value = entity.Transport;
                    cmd.Parameters.Add("@BusNo", SqlDbType.Int).Value = entity.BusNo;
                    cmd.Parameters.Add("@Sponsored", SqlDbType.VarChar).Value = entity.Sponsored;
                    cmd.Parameters.Add("@StaffNo", SqlDbType.VarChar).Value = entity.StaffNo;
                    cmd.Parameters.Add("@EmgName", SqlDbType.VarChar).Value = entity.EmgName;
                    cmd.Parameters.Add("@EmgRelation", SqlDbType.VarChar).Value = entity.EmgRelation;
                    cmd.Parameters.Add("@EmgHomePhone", SqlDbType.VarChar).Value = entity.EmgHomePhone;
                    cmd.Parameters.Add("@EmgWorkPhone", SqlDbType.VarChar).Value = entity.EmgWorkPhone;
                    cmd.Parameters.Add("@TransportArea", SqlDbType.VarChar).Value = entity.TransportArea;
                    cmd.Parameters.Add("@House", SqlDbType.VarChar).Value = entity.House;
                    cmd.Parameters.Add("@NemisNo", SqlDbType.VarChar).Value = entity.NemisNo;
                    cmd.Parameters.Add("@EntityType", SqlDbType.VarChar).Value = entity.EntityType;


                    foreach (SqlParameter p in cmd.Parameters)
                    {
                        Console.WriteLine($"{p.ParameterName}: {p.Value} ({p.Value?.GetType()})");
                    }

                    cmd.ExecuteNonQuery();
                    conn.Close();
                    return new JsonResult(entity);
                }

            }

        }

        [HttpGet("GetEntities")]
        public async Task<IActionResult> GetEntities()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("GetStudentsList", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            var students = new List<object>();
                            while (await reader.ReadAsync())
                            {
                                students.Add(new
                                {
                                    entityNo = reader.GetInt32(reader.GetOrdinal("EntityNo")),
                                    fName = reader.IsDBNull(reader.GetOrdinal("FName")) ? "" : reader.GetString(reader.GetOrdinal("FName")),
                                    mName = reader.IsDBNull(reader.GetOrdinal("MName")) ? "" : reader.GetString(reader.GetOrdinal("MName")),
                                    lName = reader.IsDBNull(reader.GetOrdinal("LName")) ? "" : reader.GetString(reader.GetOrdinal("LName"))
                                });
                            }
                            return Ok(students);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        [HttpGet("GetEntity/{entityNo}")]
        public async Task<IActionResult> GetEntity(int entityNo)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("GetEntityByNo", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@EntityNo", entityNo);

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                var student = new Entity
                                {
                                    EntityNo = reader.GetInt32(reader.GetOrdinal("EntityNo")),
                                    EntityType = reader.GetString(reader.GetOrdinal("EntityType")),
                                    Title = reader.IsDBNull(reader.GetOrdinal("Title")) ? "" : reader.GetString(reader.GetOrdinal("Title")),
                                    FName = reader.IsDBNull(reader.GetOrdinal("FName")) ? "" : reader.GetString(reader.GetOrdinal("FName")),
                                    MName = reader.IsDBNull(reader.GetOrdinal("MName")) ? "" : reader.GetString(reader.GetOrdinal("MName")),
                                    LName = reader.IsDBNull(reader.GetOrdinal("LName")) ? "" : reader.GetString(reader.GetOrdinal("LName")),
                                    DOB = reader.GetDateTime(reader.GetOrdinal("DOB")),
                                    Sex = reader.IsDBNull(reader.GetOrdinal("Sex")) ? "" : reader.GetString(reader.GetOrdinal("Sex")),
                                    Disability = reader.IsDBNull(reader.GetOrdinal("Disability")) ? "" : reader.GetString(reader.GetOrdinal("Disability")),
                                    Guardian1 = reader.IsDBNull(reader.GetOrdinal("Guardian1")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1")),
                                    Relation1 = reader.IsDBNull(reader.GetOrdinal("Relation1")) ? "" : reader.GetString(reader.GetOrdinal("Relation1")),
                                    Guardian2 = reader.IsDBNull(reader.GetOrdinal("Guardian2")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2")),
                                    Relation2 = reader.IsDBNull(reader.GetOrdinal("Relation2")) ? "" : reader.GetString(reader.GetOrdinal("Relation2")),
                                    PoBox = reader.IsDBNull(reader.GetOrdinal("PoBox")) ? "" : reader.GetString(reader.GetOrdinal("PoBox")),
                                    Address1 = reader.IsDBNull(reader.GetOrdinal("Address1")) ? "" : reader.GetString(reader.GetOrdinal("Address1")),
                                    Address2 = reader.IsDBNull(reader.GetOrdinal("Address2")) ? "" : reader.GetString(reader.GetOrdinal("Address2")),
                                    PhoneNo2 = reader.IsDBNull(reader.GetOrdinal("PhoneNo2")) ? "" : reader.GetString(reader.GetOrdinal("PhoneNo2")),
                                    EmailId = reader.IsDBNull(reader.GetOrdinal("EmailId")) ? "" : reader.GetString(reader.GetOrdinal("EmailId")),
                                    Remark = reader.IsDBNull(reader.GetOrdinal("Remark")) ? "" : reader.GetString(reader.GetOrdinal("Remark")),
                                    UpdatedUser = reader.IsDBNull(reader.GetOrdinal("UpdatedUser")) ? "" : reader.GetString(reader.GetOrdinal("UpdatedUser")),
                                    UpdatedDate = reader.GetDateTime(reader.GetOrdinal("UpdatedDate")),
                                    CountryNo = reader.GetInt32(reader.GetOrdinal("CountryNo")),
                                    ProvinceNo = reader.GetInt32(reader.GetOrdinal("ProvinceNo")),
                                    AreaNo = reader.GetInt32(reader.GetOrdinal("AreaNo")),
                                    Year = reader.IsDBNull(reader.GetOrdinal("Year")) ? "" : reader.GetString(reader.GetOrdinal("Year")),
                                    DOJ = reader.GetDateTime(reader.GetOrdinal("DOJ")),
                                    Boarding = reader.IsDBNull(reader.GetOrdinal("Boarding")) ? "" : reader.GetString(reader.GetOrdinal("Boarding")),
                                    Nationality = reader.IsDBNull(reader.GetOrdinal("Nationality")) ? "" : reader.GetString(reader.GetOrdinal("Nationality")),
                                    PrevInstitute = reader.IsDBNull(reader.GetOrdinal("PrevInstitute")) ? "" : reader.GetString(reader.GetOrdinal("PrevInstitute")),
                                    LastAttended = reader.IsDBNull(reader.GetOrdinal("LastAttended")) ? "" : reader.GetString(reader.GetOrdinal("LastAttended")),
                                    PrevRemark = reader.IsDBNull(reader.GetOrdinal("PrevRemark")) ? "" : reader.GetString(reader.GetOrdinal("PrevRemark")),
                                    StatusCode = reader.GetInt32(reader.GetOrdinal("StatusCode")),
                                    Guardian1WTel = reader.IsDBNull(reader.GetOrdinal("Guardian1WTel")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1WTel")),
                                    Guardian2WTel = reader.IsDBNull(reader.GetOrdinal("Guardian2WTel")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2WTel")),
                                    GuardianPhone1 = reader.IsDBNull(reader.GetOrdinal("GuardianPhone1")) ? "" : reader.GetString(reader.GetOrdinal("GuardianPhone1")),
                                    GuardianPhone2 = reader.IsDBNull(reader.GetOrdinal("GuardianPhone2")) ? "" : reader.GetString(reader.GetOrdinal("GuardianPhone2")),
                                    Guardian1Email = reader.IsDBNull(reader.GetOrdinal("Guardian1Email")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1Email")),
                                    Guardian2Email = reader.IsDBNull(reader.GetOrdinal("Guardian2Email")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2Email")),
                                    Guardian1Occupation = reader.IsDBNull(reader.GetOrdinal("Guardian1Occupation")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1Occupation")),
                                    Guardian2Occupation = reader.IsDBNull(reader.GetOrdinal("Guardian2Occupation")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2Occupation")),
                                    Guardian1Company = reader.IsDBNull(reader.GetOrdinal("Guardian1Company")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1Company")),
                                    Guardian2Company = reader.IsDBNull(reader.GetOrdinal("Guardian2Company")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2Company")),
                                    Guardian1CompanyAddress = reader.IsDBNull(reader.GetOrdinal("Guardian1CompanyAddress")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1CompanyAddress")),
                                    Guardian2CompanyAddress = reader.IsDBNull(reader.GetOrdinal("Guardian2CompanyAddress")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2CompanyAddress")),
                                    Guardian1Firstname = reader.IsDBNull(reader.GetOrdinal("Guardian1Firstname")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1Firstname")),
                                    Guardian1Lastname = reader.IsDBNull(reader.GetOrdinal("Guardian1Lastname")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1Lastname")),
                                    Guardian2Firstname = reader.IsDBNull(reader.GetOrdinal("Guardian2Firstname")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2Firstname")),
                                    Guardian2Lastname = reader.IsDBNull(reader.GetOrdinal("Guardian2Lastname")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2Lastname")),
                                    Guardian1IdNo = reader.IsDBNull(reader.GetOrdinal("Guardian1IdNo")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1IdNo")),
                                    Guardian2IdNo = reader.IsDBNull(reader.GetOrdinal("Guardian2IdNo")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2IdNo")),
                                    Guardian1Tel1 = reader.IsDBNull(reader.GetOrdinal("Guardian1Tel1")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1Tel1")),
                                    Guardian2Tel1 = reader.IsDBNull(reader.GetOrdinal("Guardian2Tel1")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2Tel1")),
                                    Guardian1Fax = reader.IsDBNull(reader.GetOrdinal("Guardian1Fax")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1Fax")),
                                    Guardian2Fax = reader.IsDBNull(reader.GetOrdinal("Guardian2Fax")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2Fax")),
                                    Guardian1Residence = reader.IsDBNull(reader.GetOrdinal("Guardian1Residence")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1Residence")),
                                    Guardian2Residence = reader.IsDBNull(reader.GetOrdinal("Guardian2Residence")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2Residence")),
                                    Guardian1Email2 = reader.IsDBNull(reader.GetOrdinal("Guardian1Email2")) ? "" : reader.GetString(reader.GetOrdinal("Guardian1Email2")),
                                    Guardian2Email2 = reader.IsDBNull(reader.GetOrdinal("Guardian2Email2")) ? "" : reader.GetString(reader.GetOrdinal("Guardian2Email2")),
                                    Transport = reader.IsDBNull(reader.GetOrdinal("Transport")) ? "" : reader.GetString(reader.GetOrdinal("Transport")),
                                    BusNo = reader.GetInt32(reader.GetOrdinal("BusNo")),
                                    Sponsored = reader.IsDBNull(reader.GetOrdinal("Sponsored")) ? "" : reader.GetString(reader.GetOrdinal("Sponsored")),
                                    StaffNo = reader.IsDBNull(reader.GetOrdinal("StaffNo")) ? "" : reader.GetString(reader.GetOrdinal("StaffNo")),
                                    EmgName = reader.IsDBNull(reader.GetOrdinal("EmgName")) ? "" : reader.GetString(reader.GetOrdinal("EmgName")),
                                    EmgRelation = reader.IsDBNull(reader.GetOrdinal("EmgRelation")) ? "" : reader.GetString(reader.GetOrdinal("EmgRelation")),
                                    EmgHomePhone = reader.IsDBNull(reader.GetOrdinal("EmgHomePhone")) ? "" : reader.GetString(reader.GetOrdinal("EmgHomePhone")),
                                    EmgWorkPhone = reader.IsDBNull(reader.GetOrdinal("EmgWorkPhone")) ? "" : reader.GetString(reader.GetOrdinal("EmgWorkPhone")),
                                    TransportArea = reader.IsDBNull(reader.GetOrdinal("TransportArea")) ? "" : reader.GetString(reader.GetOrdinal("TransportArea")),
                                    House = reader.IsDBNull(reader.GetOrdinal("House")) ? "" : reader.GetString(reader.GetOrdinal("House")),
                                    NemisNo = reader.IsDBNull(reader.GetOrdinal("NemisNo")) ? "" : reader.GetString(reader.GetOrdinal("NemisNo"))
                                };
                                return Ok(student);
                            }
                            return NotFound($"Student with EntityNo {entityNo} not found");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }


        }
    }
}