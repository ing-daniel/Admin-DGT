using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DataAcces
{
    public interface IGenericDA<TEntity> where TEntity : class
    {
        int Actualizar(TEntity entidad);
        Task<int> ActualizarAsync(TEntity entidad);
        IEnumerable<TEntity> BuscarPorDato(Expression<Func<TEntity, bool>> filtro);
        Task<IEnumerable<TEntity>> BuscarPorDatoAsync(Expression<Func<TEntity, bool>> filtro);
        TEntity BuscarPorId(params object[] pks);
        Task<TEntity> BuscarPorIdAsync(params object[] pks);
        int Eliminar(IEnumerable<TEntity> coleccion);
        TEntity Eliminar(params object[] pks);
        int Eliminar(TEntity entidad);
        Task<int> EliminarAsync(IEnumerable<TEntity> coleccion);
        Task<TEntity> EliminarAsync(params object[] pks);
        Task<int> EliminarAsync(TEntity entidad);
        bool Existe(params object[] pks);
        int Insertar(IEnumerable<TEntity> coleccion);
        int Insertar(TEntity entidad);
        Task<int> InsertarAsync(IEnumerable<TEntity> coleccion);
        Task<int> InsertarAsync(TEntity entidad);
        IEnumerable<TEntity> Todos();
        Task<IEnumerable<TEntity>> TodosAsync();
    }
}