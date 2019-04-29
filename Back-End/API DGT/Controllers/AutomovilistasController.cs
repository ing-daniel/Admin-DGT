
namespace API_DGT.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Entidades;
    using DataAcces;

    [Route("api/[controller]")]
    [ApiController]
    public class AutomovilistasController : ControllerBase
    {
        private readonly IGenericDA<Automovilista> _context;

        public AutomovilistasController(IGenericDA<Automovilista> context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Automovilista> GetAutomovilistas()
        {
            return _context.Todos();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAutomovilista([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var automovilista = await _context.BuscarPorIdAsync(id);

            if (automovilista == null)
            {
                return NotFound();
            }

            return Ok(automovilista);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAutomovilista([FromRoute] Guid id, [FromBody] Automovilista automovilista)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != automovilista.Id)
            {
                return BadRequest();
            }

            try
            {
                await _context.ActualizarAsync(automovilista);
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
        public async Task<IActionResult> PostAutomovilista([FromBody] Automovilista automovilista)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.InsertarAsync(automovilista);

            return CreatedAtAction("GetAutomovilista", new { id = automovilista.Id }, automovilista);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAutomovilista([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var automovilista = await _context.EliminarAsync(id);

            return Ok(automovilista);
        }

        [HttpGet("{id}/Autos")]
        public async Task<IActionResult> GetAutos([FromRoute] Guid? id)
        {
            var auto = await AutomovilistasDA.AutosAsync((Guid)id);
            return Ok(auto);
        }
    }
}