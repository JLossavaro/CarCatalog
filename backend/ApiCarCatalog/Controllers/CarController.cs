using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiCarCatalog.Context;
using ApiCarCatalog.Models;
using Microsoft.AspNetCore.Authorization;

namespace ApiCarCatalog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly DataContext _context;

        public CarController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Car
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> Getcars()
        {
            return await _context.cars.ToListAsync();
        }

        // GET: api/Car/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.cars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        // PUT: api/Car/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> PutCar(int id, Car car)
        {
            if (id != car.Id)
            {
                return BadRequest();
            }

            _context.Entry(car).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Car

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            _context.cars.Add(car);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCar", new { id = car.Id }, car);
        }

        // DELETE: api/Car/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }

            _context.cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool CarExists(int id)
        {
            return _context.cars.Any(e => e.Id == id);
        }




    }
}
