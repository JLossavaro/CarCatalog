sing ApiCarCatalog.Models;

namespace ApiCarCatalog.Services
{
    public interface ICarService
    {
        public Car Create(Car car);
        public Car Get(Car car);
        public List<Car> List();
        public Car Update(Car car);
        public bool Delete(int id);




    }
}
