namespace Entidades
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;

    public class EntidadesDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=DGT_DB;Trusted_Connection=True;MultipleActiveResultSets=true")
                .EnableSensitiveDataLogging(true)
                .UseLoggerFactory(new LoggerFactory().AddConsole((category, level) => level == LogLevel.Information && category == DbLoggerCategory.Database.Command.Name, true));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Auto>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<Automovilista>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<AutoAutomivilista>().HasKey(x => new {x.Id,  x.AutoId, x.AutomovilistaId  });
            modelBuilder.Entity<AutoAutomivilista>().Property(x => x.Id).UseSqlServerIdentityColumn();
            modelBuilder.Entity<AutoAutomivilista>()
                   .HasOne(pt => pt.Auto)
                   .WithMany(p => p.AutosAutomivilistas)
                   .HasForeignKey(pt => pt.AutoId);

            modelBuilder.Entity<AutoAutomivilista>()
                   .HasOne(p => p.Automovilista)
                   .WithMany(pc => pc.AutosAutomivilistas)
                   .HasForeignKey(p => p.AutomovilistaId);

            modelBuilder.Entity<MultaAutoAutomivilista>().HasKey(x => new { x.MultaId, x.AutoAutomivilistaId });
            modelBuilder.Entity<MultaAutoAutomivilista>()
                   .HasOne(pt => pt.Multa)
                   .WithMany(p => p.MultasAutoAutomivilistas)
                   .HasForeignKey(pt => pt.MultaId);

            modelBuilder.Entity<MultaAutoAutomivilista>()
                   .HasOne(p => p.AutoAutomivilista)
                   .WithMany(pc => pc.MultasAutoAutomivilistas)
                   .HasPrincipalKey(p => p.Id)
                   .HasForeignKey(p => p.AutoAutomivilistaId);
        }

        public DbSet<Automovilista> Automovilistas { get; set; }
        public DbSet<Auto> Autos { get; set; }
        public DbSet<Multa> Multas { get; set; }
        public DbSet<AutoAutomivilista> AutosAutomivilistas { get; set; }
        public DbSet<MultaAutoAutomivilista> MultasAutoAutomivilistas { get; set; }

    }
}
