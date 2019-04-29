using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Entidades
{
    public class MultaAutoAutomivilista
    {
        public int MultaId { get; set; }
        public int AutoAutomivilistaId { get; set; }
        public Multa Multa { get; set; }
        public AutoAutomivilista AutoAutomivilista { get; set; }

        public bool Pagada { get; set; }
        public DateTime Fecha { get; set; }
    }
}
