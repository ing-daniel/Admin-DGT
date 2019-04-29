namespace API_DGT.Controllers
{
    using DataAcces;
    using Entidades;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class AutosController : ControllerBase
    {
        private readonly IGenericDA<Auto> _context;

        public AutosController(IGenericDA<Auto> context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Auto> GetAutos()
        {
            return _context.Todos();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuto([FromRoute] Guid? id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var auto = await _context.BuscarPorIdAsync(id);

            if (auto == null)
            {
                return NotFound();
            }

            return Ok(auto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuto([FromRoute] Guid id, [FromBody] Auto auto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != auto.Id)
            {
                return BadRequest();
            }

            try
            {
                await _context.ActualizarAsync(auto);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Existe(id))
                {
                    return NotFound();
                }
                
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> PostAuto([FromBody] Auto auto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.InsertarAsync(auto);

            return CreatedAtAction("GetAuto", new { id = auto.Id }, auto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuto([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var auto = await _context.EliminarAsync(id);

            return Ok(auto);
        }

    }
}