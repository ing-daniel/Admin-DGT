namespace API_DGT.Controllers
{
    using DataAcces;
    using Entidades;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Threading.Tasks;
    
    [Route("api/[controller]")]
    [ApiController]
    public class RelacionesController : ControllerBase
    {
        [HttpPost("AutoAutomovilista")]
        public async Task<IActionResult> InsertarAutoAutomovilista([FromBody] AutoAutomivilista relacion)
        {
            var cantidad = AutomovilistasDA.NumAutosAsignados((Guid)relacion.AutomovilistaId);
            if (cantidad == 10)
            {
                return Ok("La cantidad máxima de autos asignados al automovilista se a alcanzado.");
            }
            else
            {
                string resultado = await RelacionesDA.InsertAutoAutomovilistaAsync(relacion);
                return Ok(resultado);
            }
        }

        [HttpPost("MultaAutoAutomovilista")]
        public async Task<IActionResult> InsertarMultaAutoAutomovilista([FromBody] MultaAutoAutomivilista relacion)
        {
            relacion.Fecha = DateTime.Now;
            string resultado = await RelacionesDA.InsertMultaAutoAutomovilistaAsync(relacion);
            return Ok(resultado);
        }

        [HttpGet("Autos/{idAuto}/Automovilistas")]
        public async Task<IActionResult> GetAutomovilistas([FromRoute] Guid? idAuto)
        {
            var automovilistas = await AutosDA.AutomovilstasAsync((Guid)idAuto);
            return Ok(automovilistas);
        }

        [HttpGet("Automovilistas/{idAutomovilista}/Autos")]
        public async Task<IActionResult> GetAutos([FromRoute] Guid? idAutomovilista)
        {
            var autos = await AutomovilistasDA.AutosAsync((Guid)idAutomovilista);
            return Ok(autos);
        }

    }
}
