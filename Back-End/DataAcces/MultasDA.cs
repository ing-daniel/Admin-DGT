namespace DataAcces
{
    using Entidades;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public static class MultasDA
    {
        public static Automovilista Automovilsta(Guid id)
        {
            var resultado = new Automovilista();

            using (var context = new EntidadesDbContext())
            {
               resultado = context
                    .Automovilistas
                    .Where(x => x.Id == id)
                    .Include(x => x.AutosAutomivilistas)
                    .ThenInclude(y => y.MultasAutoAutomivilistas)
                    .ThenInclude( x => x.Multa)
                    .FirstOrDefault();
            }

            return resultado;
        }

        public static List<MultaFrecuente> top5()
        {
            var resultado = new List<MultaFrecuente>();

            using (var context = new EntidadesDbContext())
            {
               resultado = (from ma in context.MultasAutoAutomivilistas
                            join m in context.Multas on ma.MultaId equals m.Id
                            group ma by ma.Multa into grp
                            select new MultaFrecuente
                            {
                                Nombre = grp.Key.Descripcion,
                                PuntosDescontados = grp.Key.PuntosMenos,
                                Cantidad = grp.Count()
                            }).ToList();
            }

            return resultado;
        }

        public static Task<Automovilista> AutomovilstaAsync(Guid id) =>
            Task.Run(() => Automovilsta(id));

        public static Task<List<MultaFrecuente>> top5Async() =>
            Task.Run(() => top5());
    }
}
