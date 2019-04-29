namespace DataAcces
{
    using Entidades;
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using System.Linq;

    public static class RelacionesDA
    {
        public static string InsertAutoAutomovilista(AutoAutomivilista relacion)
        {
            string error = "";

            using (var context = new EntidadesDbContext())
            {
                try
                {
                    var elemento = context.AutosAutomivilistas.FirstOrDefault(x => x.AutoId == relacion.AutoId && x.AutomovilistaId == relacion.AutomovilistaId);
                    if(elemento == null)
                    {
                        context.AutosAutomivilistas.Add(relacion);
                        context.SaveChanges();
                    }
                    else
                    {
                        error = "La relacion que intenta agregar ya existe.";
                    }
                    
                }
                catch (Exception)
                {
                    error = "Ocurrio un error y no se logro insertar la relación.";
                }
            }
            return error;
        }

        public static string InsertMultaAutoAutomovilista(MultaAutoAutomivilista relacion)
        {
            string error = "";

            using (var context = new EntidadesDbContext())
            {
                try
                {
                    var elemento = context
                                        .AutosAutomivilistas
                                        .FirstOrDefault(x => x.Id == relacion.AutoAutomivilistaId);
                    
                    var automovilista = context
                                            .Automovilistas
                                            .FirstOrDefault(x => x.Id == elemento.AutomovilistaId);

                    var cantidad = context
                                        .Multas
                                        .FirstOrDefault(x => x.Id == relacion.MultaId).PuntosMenos;

                    if((automovilista.Puntos - cantidad) < 0)
                        automovilista.Puntos = 0;
                    else
                        automovilista.Puntos -= cantidad;

                    context.MultasAutoAutomivilistas.Add(relacion);
                    context.SaveChanges();
                }
                catch (Exception)
                {
                    error = "Ocurrio un error y no se logro aplicar la multa.";
                }
            }
            return error;
        }

        public static Task<string> InsertAutoAutomovilistaAsync(AutoAutomivilista relacion) =>
            Task.Run(() => InsertAutoAutomovilista(relacion));

        public static Task<string> InsertMultaAutoAutomovilistaAsync(MultaAutoAutomivilista relacion) =>
            Task.Run(() => InsertMultaAutoAutomovilista(relacion));
    }
}
