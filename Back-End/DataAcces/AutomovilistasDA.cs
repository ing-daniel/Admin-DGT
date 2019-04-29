namespace DataAcces
{
    using Entidades;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public static class AutomovilistasDA
    {
        public static Automovilista Autos(Guid id)
        {
            var resultado = new Automovilista();

            using (var context = new EntidadesDbContext())
            {
                resultado = context.Automovilistas
                    .Where(x => x.Id == id)
                    .Include(x => x.AutosAutomivilistas)
                    .ThenInclude(y => y.Auto).FirstOrDefault();
            }

            return resultado;
        }

        public static int NumAutosAsignados(Guid id)
        {
            var resultado = 0;

            using (var context = new EntidadesDbContext())
            {
                resultado = context.AutosAutomivilistas.Where(x=> x.AutomovilistaId == id).Count();
            }

            return resultado;
        }

        public static Task<Automovilista> AutosAsync(Guid id) =>
            Task.Run(() => Autos(id));
    }
}
