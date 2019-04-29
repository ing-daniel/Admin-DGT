namespace Entidades
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Text;

    public class Automovilista
    {
        public Guid Id { get; set; }
        [StringLength(30)]
        public string Nombre { get; set; }
        [StringLength(50)]
        public string Apellidos { get; set; }
        public byte Puntos { get; set; }

        public List<AutoAutomivilista> AutosAutomivilistas { get; set; }
    }
}
