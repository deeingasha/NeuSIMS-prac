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
        public EntityController(IConfiguration config)
        {
            _config = config;
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
    }
}