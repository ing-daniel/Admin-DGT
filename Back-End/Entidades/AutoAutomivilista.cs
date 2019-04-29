namespace Entidades
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.ComponentModel.DataAnnotations;

    public class AutoAutomivilista
    {
        public int Id { get; set; }
        public Guid AutoId { get; set; }
        public Auto Auto { get; set; }
        public Guid AutomovilistaId { get; set; }
        public Automovilista Automovilista { get; set; }

        public List<MultaAutoAutomivilista> MultasAutoAutomivilistas { get; set; }
    }
}
