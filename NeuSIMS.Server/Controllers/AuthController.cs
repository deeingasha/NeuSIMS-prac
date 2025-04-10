using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace NeuSIMS.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        // Signup endpoint
        [HttpPost("signup")]
        public IActionResult Signup([FromBody] LoginModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid input data", errors = ModelState });
            }

            string connStr = _config.GetSection("Configuration").GetSection("ConnectionString").Value;

            try
            {
                using (SqlConnection conn = new SqlConnection(connStr))
                {
                    conn.Open();

                    // Log the received data
                    Console.WriteLine($"Attempting to create user: {user.Username}");

                    // Check if user already exists
                    var checkCmd = new SqlCommand(
                        "SELECT COUNT(*) FROM m_User WHERE v_User_Name = @username",
                        conn
                    );
                    checkCmd.Parameters.AddWithValue("@username", user.Username);
                    int userExists = (int)checkCmd.ExecuteScalar();

                    if (userExists > 0)
                    {
                        return BadRequest(new { message = "User already exists" });
                    }

                    // Hash the password
                    string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);

                    // Insert new user with all required fields
                    var insertCmd = new SqlCommand(@"
                INSERT INTO m_User (
                    v_User_Name,
                    v_Password,
                    fn_Role_No,
                    v_User_Status  -- Added this field
                ) VALUES (
                    @username,
                    @password,
                    8,
                    1
                )", conn);
                    insertCmd.Parameters.AddWithValue("@username", user.Username);
                    insertCmd.Parameters.AddWithValue("@password", hashedPassword);
                    // insertCmd.Parameters.AddWithValue("@userStatus", 1); // or 1 for bit column
                    insertCmd.ExecuteNonQuery();

                    return Ok(new { message = "User registered successfully" });
                }
            }
            catch (Exception ex)
            {
                // Console.WriteLine($"Error during signup: {ex.Message}");
                // return StatusCode(500, new { message = "Error registering user", error = ex.Message });
                Console.WriteLine($"SQL Error: {ex.Message}");
                return StatusCode(500, new { message = "Database error", error = ex.Message });
            }
        }

        // Login endpoint
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel user)
        {
            Console.WriteLine($"Login attempt for username: {user.Username}");
            string connStr = _config.GetSection("Configuration").GetSection("ConnectionString").Value;

            try
            {
                using (SqlConnection conn = new SqlConnection(connStr))
                {
                    conn.Open();

                    // Retrieve user details including status
                    var cmd = new SqlCommand(
                        "SELECT v_Password, v_User_Status FROM m_User WHERE v_User_Name = @username",
                        conn
                    );
                    cmd.Parameters.AddWithValue("@username", user.Username);

                    string storedPassword = null;
                    bool? userStatus = null;

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            storedPassword = reader["v_Password"].ToString();
                            userStatus = reader["v_User_Status"] as bool?;
                        }
                    }

                    // Check if user exists
                    if (storedPassword == null)
                    {
                        return Unauthorized(new { message = "Invalid username or password" });
                    }

                    // Check if user is active
                    if (userStatus.HasValue && !userStatus.Value)
                    {
                        return Unauthorized(new { message = "Account is inactive" });
                    }

                    // Verify password
                    if (!BCrypt.Net.BCrypt.Verify(user.Password, storedPassword))
                    {
                        return Unauthorized(new { message = "Invalid username or password" });
                    }

                    // Generate JWT token
                    var token = GenerateToken(user.Username);

                    return Ok(new
                    {
                        message = "Login successful",
                        token = token,
                        username = user.Username
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login error: {ex.Message}");
                return StatusCode(500, new { message = "Error during login", error = ex.Message });
            }
        }

        private string GenerateToken(string username)
        {
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, username),
        new Claim(ClaimTypes.NameIdentifier, username),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "NeuSIMS",
                audience: "NeuSIMS",
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
