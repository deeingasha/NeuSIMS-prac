public class LoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string tokenheader { get; set; }

    // public bool UserStatus { get; set; } = true; // Default to active

}

public class UpdatePassword
{
    public string EntityNo { get; set; }
    public string Secretword { get; set; }
    public string Password { get; set; }


}