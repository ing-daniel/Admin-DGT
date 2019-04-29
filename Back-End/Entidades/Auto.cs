namespace Entidades
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Text;

    public class Auto
    {
        public Guid Id { get; set; }
        [StringLength(30)]
        public string Matricula { get; set; }
        [StringLength(80)]
        public string Marca { get; set; }
        [StringLength(80)]
        public string Modelo { get; set; }

        public List<AutoAutomivilista> AutosAutomivilistas { get; set; }

    }
}
