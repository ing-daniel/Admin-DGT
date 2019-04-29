using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entidades
{
    public class Multa
    {
        public int Id { get; set; }
        [StringLength(100,ErrorMessage = "La descripción de la multa no debe superar los 100 caracteres.")]
        public string Descripcion { get; set; }
        public byte PuntosMenos { get; set; }

        public List<MultaAutoAutomivilista> MultasAutoAutomivilistas { get; set; }
    }
}
