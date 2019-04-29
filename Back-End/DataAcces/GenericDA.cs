namespace DataAcces
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;

    public class GenericDA<TEntity> : IGenericDA<TEntity> where TEntity : class, new()
    {
        protected readonly Func<DbContext> _dbContext;

        public GenericDA(Func<DbContext> dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext), $"El parametro  dbContext no puede ser null");
        }

        #region Sincronos
        public IEnumerable<TEntity> Todos()
        {
            var resultado = Enumerable.Empty<TEntity>();

            using (var context = _dbContext())
                resultado = context.Set<TEntity>()?.ToList();

            return resultado;
        }

        public bool Existe(params object[] pks)
        {
            if (pks == null) throw new ArgumentNullException(nameof(pks), $"El parametro pks no puede ser null");
            bool existe = false;

            using (var context = _dbContext())
                existe = context.Set<TEntity>()?.Find(pks) != null;

            return existe;
        }

        public TEntity BuscarPorId(params object[] pks)
        {
            if (pks == null) throw new ArgumentNullException(nameof(pks), $"El parametro pks no puede ser null");

            TEntity resultado = null;

            using (var context = _dbContext())
                resultado = context.Set<TEntity>()?.Find(pks);

            return resultado;
        }

        public IEnumerable<TEntity> BuscarPorDato(Expression<Func<TEntity, bool>> filtro)
        {
            if (filtro == null) throw new ArgumentNullException(nameof(filtro), $"El parametro filtro no puede ser null");

            var resultado = Enumerable.Empty<TEntity>();

            using (var context = _dbContext())
                resultado = context.Set<TEntity>()?.Where(filtro)?.ToList();

            return resultado;
        }

        public int Insertar(TEntity entidad)
        {
            if (entidad == null) throw new ArgumentNullException(nameof(entidad), $"El parametro entidad no puede ser null");

            var resultado = 0;

            using (var context = _dbContext())
            {
                var dbSet = context.Set<TEntity>();
                dbSet.Add(entidad);
                resultado = context.SaveChanges();
            }

            return resultado;
        }

        public int Insertar(IEnumerable<TEntity> coleccion)
        {
            if (coleccion == null) throw new ArgumentNullException(nameof(coleccion), $"El parametro coleccion no puede ser null");

            var resultado = 0;

            using (var context = _dbContext())
            {
                var dbSet = context.Set<TEntity>();
                dbSet.AddRange(coleccion);
                resultado = context.SaveChanges();
            }

            return resultado;
        }

        public int Eliminar(TEntity entidad)
        {
            if (entidad == null) throw new ArgumentNullException(nameof(entidad), $"El parametro entidad no puede ser null");

            var resultado = 0;

            using (var context = _dbContext())
            {
                var dbSet = context.Set<TEntity>();
                dbSet.Attach(entidad);
                context.Entry(entidad).State = EntityState.Deleted;
                resultado = context.SaveChanges();
            }

            return resultado;
        }

        public int Eliminar(IEnumerable<TEntity> coleccion)
        {
            if (coleccion == null) throw new ArgumentNullException(nameof(coleccion), $"El parametro coleccion no puede ser null");

            var resultado = 0;

            using (var context = _dbContext())
            {
                var dbSet = context.Set<TEntity>();

                foreach (var removeEntity in coleccion)
                {
                    dbSet.Attach(removeEntity);
                    context.Entry(removeEntity).State = EntityState.Deleted;
                }

                dbSet.RemoveRange(coleccion);
                resultado = context.SaveChanges();
            }

            return resultado;
        }

        public TEntity Eliminar(params object[] pks)
        {
            if (pks == null) throw new ArgumentNullException(nameof(pks), $"El parametro pks no puede ser null");

            var entity = new TEntity();
            var resultado = 0;

            using (var context = _dbContext())
            {
                var dbSet = context.Set<TEntity>();
                entity = dbSet.Find(pks);
                dbSet.Attach(entity);
                context.Entry(entity).State = EntityState.Deleted;
                resultado = context.SaveChanges();
            }

            return resultado != 0 ? entity : new TEntity();
        }

        public int Actualizar(TEntity entidad)
        {
            if (entidad == null) throw new ArgumentNullException(nameof(entidad), $"El parametro entidad no puede ser null");

            var resultado = 0;

            using (var context = _dbContext())
            {
                var dbSet = context.Set<TEntity>();
                dbSet.Attach(entidad);
                context.Entry(entidad).State = EntityState.Modified;
                resultado = context.SaveChanges();
            }

            return resultado;
        }
        #endregion

        #region Asincronos
        public Task<IEnumerable<TEntity>> TodosAsync() =>
             Task.Run(() => Todos());

        public Task<TEntity> BuscarPorIdAsync(params object[] pks) =>
            Task.Run(() => BuscarPorId(pks));

        public Task<IEnumerable<TEntity>> BuscarPorDatoAsync(Expression<Func<TEntity, bool>> filtro) =>
            Task.Run(() => BuscarPorDato(filtro));

        public Task<int> InsertarAsync(TEntity entidad) =>
            Task.Run(() => Insertar(entidad));

        public Task<int> InsertarAsync(IEnumerable<TEntity> coleccion) =>
            Task.Run(() => Insertar(coleccion));

        public Task<int> EliminarAsync(TEntity entidad) =>
            Task.Run(() => Eliminar(entidad));

        public Task<int> EliminarAsync(IEnumerable<TEntity> coleccion) =>
            Task.Run(() => Eliminar(coleccion));

        public Task<TEntity> EliminarAsync(params object[] pks) =>
            Task.Run(() => Eliminar(pks));

        public Task<int> ActualizarAsync(TEntity entidad) =>
            Task.Run(() => Actualizar(entidad));
        #endregion

    }
}

