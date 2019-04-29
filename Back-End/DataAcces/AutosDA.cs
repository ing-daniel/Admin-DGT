using Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces
{
    public static class AutosDA
    {
        public static Auto Automovilstas(Guid id)
        {
            var resultado = new Auto();

            using (var context = new EntidadesDbContext())
            {
                resultado = context.Autos
                    .Where(x => x.Id == id)
                    .Include(x => x.AutosAutomivilistas)
                    .ThenInclude(y => y.Automovilista).FirstOrDefault();
            }

            return resultado;
        }

        public static Task<Auto> AutomovilstasAsync(Guid id) =>
            Task.Run(() => Automovilstas(id));

    }
}
