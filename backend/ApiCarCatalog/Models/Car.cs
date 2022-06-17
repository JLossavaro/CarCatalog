using System.ComponentModel.DataAnnotations;

namespace ApiCarCatalog.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Year { get; set; }
        public int Price { get; set; }
        public string Picture { get; set; }

    }
}
