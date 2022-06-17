namespace ApiCarCatalog.Models
{
    public class UserConstants
    {
        public static List<User> Users = new List<User>()
        {
        new() { Username = "julio_admin", Email="julio.admin@bol.br", Password="admin123", Name="Julio", Surname="Lossavaro", Role="Administrator" },
        new() { Username = "julio_user", Email="julio.user@bol.br", Password="user123", Name="Julio", Surname="Lossavaro", Role="Standard"},
        };


    }
}
