namespace API_DGT.Controllers
{
    using DataAcces;
    using Entidades;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [Route("api/[controller]")]
    [ApiController]
    public class MultasController : ControllerBase
    {
        private readonly IGenericDA<Multa> _context;

        public MultasController(IGenericDA<Multa> context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Multa> GetMultas()
        {
            return _context.Todos();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMulta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var multa = await _context.BuscarPorIdAsync(id);

            if (multa == null)
            {
                return NotFound();
            }

            return Ok(multa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMulta([FromRoute] int id, [FromBody] Multa multa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != multa.Id)
            {
                return BadRequest();
            }

            try
            {
                await _context.ActualizarAsync(multa);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Existe(id))
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

        [HttpPost]
        public async Task<IActionResult> PostMulta([FromBody] Multa multa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.InsertarAsync(multa);

            return CreatedAtAction("GetMulta", new { id = multa.Id }, multa);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMulta([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var multa = await _context.EliminarAsync(id);

            return Ok(multa);
        }

        [HttpGet("{id}/AutosAutomovilistas")]
        public async Task<IActionResult> GetAutoAutomovilistas([FromRoute] Guid? id)
        {
            var auto = await AutosDA.AutomovilstasAsync((Guid)id);
            return Ok(auto);
        }

        [HttpGet("Automovilistas/{idAutomovilista}")]
        public async Task<IActionResult> GetMultas([FromRoute] Guid? idAutomovilista)
        {
            List<Multa> lista = new List<Multa>();

            Automovilista automovilista = await MultasDA.AutomovilstaAsync((Guid)idAutomovilista);
            List<MultaAutoAutomivilista> multas = automovilista.AutosAutomivilistas
                                            ?.FirstOrDefault()
                                            ?.MultasAutoAutomivilistas.ToList();

            multas = multas ?? new List<MultaAutoAutomivilista>();
            
            foreach (var elemento in multas)
            {
                lista.Add(
                    new Multa
                    {
                        Id = (int)elemento?.Multa?.Id,
                        PuntosMenos = (byte)elemento?.Multa?.PuntosMenos,
                        Descripcion = elemento?.Multa?.Descripcion
                    });
            }

            return Ok(lista);
        }

        [HttpGet("Top5")]
        public async Task<IActionResult> Top5()
        {
            var multas = await MultasDA.top5Async();
            return Ok(multas);
        }

    }
}