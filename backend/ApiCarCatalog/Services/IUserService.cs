using ApiCarCatalog.Models;

namespace ApiCarCatalog.Services
{
    public interface IUserService
    {
        public User Get(UserLogin userlogin);

    }
}
