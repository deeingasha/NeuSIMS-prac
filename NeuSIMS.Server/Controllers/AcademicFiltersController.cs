using Microsoft.AspNetCore.Mvc;
using System.Data;
using NeuSIMS.Server.Models;
using Microsoft.Data.SqlClient;

namespace NeuSIMS.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AcademicFiltersController : ControllerBase
    {
        private readonly string _connectionString;

        public AcademicFiltersController(IConfiguration config)
        {
            _connectionString = config.GetSection("Configuration")?["ConnectionString"]
                ?? throw new InvalidOperationException("Connection string 'ConnectionString' not found in configuration.");
        }

        [HttpGet("GetAcademicYears")]
        public async Task<IActionResult> GetAcademicYears()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand(
                        @"SELECT 
                            py_Year AS Year, 
                            d_Start_Date AS StartDate, 
                            d_End_Date AS EndDate, 
                            b_Default_Year AS IsDefault 
                          FROM m_year",
                        connection))
                    {
                        // Add debug logging
                        var years = new List<AcademicYear>();
                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                years.Add(new AcademicYear
                                {
                                    Year = reader.GetString(reader.GetOrdinal("Year")),
                                    StartDate = reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                    EndDate = reader.GetDateTime(reader.GetOrdinal("EndDate")),
                                    IsDefault = reader.GetBoolean(reader.GetOrdinal("IsDefault"))
                                });
                            }
                        }
                        // // Debug log before returning
                        // Console.WriteLine($"Retrieved {years.Count} academic years");
                        return Ok(years);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetAcademicYears: {ex.Message}");
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("GetClasses")]
        public async Task<IActionResult> GetClasses()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("SELECT pn_Class_No, v_class FROM m_class", connection))
                    {
                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            var classes = new List<ClassInfo>();
                            while (await reader.ReadAsync())
                            {
                                classes.Add(new ClassInfo
                                {
                                    ClassNo = reader.GetInt32(reader.GetOrdinal("pn_Class_No")),
                                    ClassName = reader.GetString(reader.GetOrdinal("v_class"))
                                });
                            }
                            return Ok(classes);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("GetStreams/{classNo}")]
        public async Task<IActionResult> GetStreams(int classNo)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand("SELECT pn_stream_no, v_stream FROM m_stream WHERE fn_Class_no = @ClassNo", connection))
                    {
                        command.Parameters.AddWithValue("@ClassNo", classNo);
                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            var streams = new List<StreamInfo>();
                            while (await reader.ReadAsync())
                            {
                                streams.Add(new StreamInfo
                                {
                                    StreamNo = reader.GetInt32(reader.GetOrdinal("pn_stream_no")),
                                    StreamName = reader.GetString(reader.GetOrdinal("v_stream")),
                                    ClassNo = classNo
                                });
                            }
                            return Ok(streams);
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