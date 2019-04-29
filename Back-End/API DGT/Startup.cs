using DataAcces;
using Entidades;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API_DGT
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("AllowOrigin", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            }));
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddControllersAsServices()
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );
            services.AddDbContext<EntidadesDbContext>(options => {
                options.UseSqlServer(Configuration.GetConnectionString("localdb"));
            });
            services.AddScoped<IGenericDA<Auto>, GenericDA<Auto>>(
                    sp => new GenericDA<Auto>(() => sp.GetService<EntidadesDbContext>()));
            services.AddScoped<IGenericDA<Automovilista>, GenericDA<Automovilista>>(
                    sp => new GenericDA<Automovilista>(() => sp.GetService<EntidadesDbContext>()));
            services.AddScoped<IGenericDA<Multa>, GenericDA<Multa>>(
                    sp => new GenericDA<Multa>(() => sp.GetService<EntidadesDbContext>()));
            services.AddScoped<IGenericDA<AutoAutomivilista>, GenericDA<AutoAutomivilista>>(
                   sp => new GenericDA<AutoAutomivilista>(() => sp.GetService<EntidadesDbContext>()));
            services.AddScoped<IGenericDA<MultaAutoAutomivilista>, GenericDA<MultaAutoAutomivilista>>(
                   sp => new GenericDA<MultaAutoAutomivilista>(() => sp.GetService<EntidadesDbContext>()));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseCors("AllowOrigin");
            app.UseHttpsRedirection();

            app.UseMvc();
            
        }
    }
}
