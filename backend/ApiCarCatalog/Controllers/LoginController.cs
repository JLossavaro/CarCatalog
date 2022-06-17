    using ApiCarCatalog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ApiCarCatalog.Models;
using System.Text;
using ApiCarCatalog.Context;

namespace ApiCarCatalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly DataContext _context;
        public LoginController(IConfiguration config, DataContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {

            var user = Authenticate(userLogin);

            if (user != null)
            {
                var token = Generate(user);

                return Ok(token);
            }
            return NotFound("user not found");
        }



        /*Função responsavel por verificar username e senha
         *e retornar do banco o usuário, caso encontrado. 
         **CalledOn: Login()
         */
        private User Authenticate(UserLogin userLogin)
        {

            var currentUser = _context.users.FirstOrDefault(o => o.Username.ToLower() ==
                userLogin.Username.ToLower() && o.Password == userLogin.Password);

            if (currentUser != null)
            {
                return currentUser;
            }

            return null;
        }

        /*
         * Função responsavel por construir um objeto Claim com
         * os dados do usuário e por fim retornar um token com 
         * o token/dados do usuário.
         **CalledOn: Login()
        */

        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.Name),
                new Claim(ClaimTypes.Surname, user.Surname),
                new Claim(ClaimTypes.Role, user.Role),
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt: Audience"],
                claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }










    }

}

