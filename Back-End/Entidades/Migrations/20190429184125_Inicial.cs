using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Entidades.Migrations
{
    public partial class Inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Automovilistas",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "NEWID()"),
                    Nombre = table.Column<string>(maxLength: 30, nullable: true),
                    Apellidos = table.Column<string>(maxLength: 50, nullable: true),
                    Puntos = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Automovilistas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Autos",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "NEWID()"),
                    Matricula = table.Column<string>(maxLength: 30, nullable: true),
                    Marca = table.Column<string>(maxLength: 80, nullable: true),
                    Modelo = table.Column<string>(maxLength: 80, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Autos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Multas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Descripcion = table.Column<string>(maxLength: 100, nullable: true),
                    PuntosMenos = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Multas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AutosAutomivilistas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AutoId = table.Column<Guid>(nullable: false),
                    AutomovilistaId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutosAutomivilistas", x => new { x.Id, x.AutoId, x.AutomovilistaId });
                    table.UniqueConstraint("AK_AutosAutomivilistas_Id", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AutosAutomivilistas_Autos_AutoId",
                        column: x => x.AutoId,
                        principalTable: "Autos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AutosAutomivilistas_Automovilistas_AutomovilistaId",
                        column: x => x.AutomovilistaId,
                        principalTable: "Automovilistas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MultasAutoAutomivilistas",
                columns: table => new
                {
                    MultaId = table.Column<int>(nullable: false),
                    AutoAutomivilistaId = table.Column<int>(nullable: false),
                    Pagada = table.Column<bool>(nullable: false),
                    Fecha = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MultasAutoAutomivilistas", x => new { x.MultaId, x.AutoAutomivilistaId });
                    table.ForeignKey(
                        name: "FK_MultasAutoAutomivilistas_AutosAutomivilistas_AutoAutomivilistaId",
                        column: x => x.AutoAutomivilistaId,
                        principalTable: "AutosAutomivilistas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MultasAutoAutomivilistas_Multas_MultaId",
                        column: x => x.MultaId,
                        principalTable: "Multas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AutosAutomivilistas_AutoId",
                table: "AutosAutomivilistas",
                column: "AutoId");

            migrationBuilder.CreateIndex(
                name: "IX_AutosAutomivilistas_AutomovilistaId",
                table: "AutosAutomivilistas",
                column: "AutomovilistaId");

            migrationBuilder.CreateIndex(
                name: "IX_MultasAutoAutomivilistas_AutoAutomivilistaId",
                table: "MultasAutoAutomivilistas",
                column: "AutoAutomivilistaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MultasAutoAutomivilistas");

            migrationBuilder.DropTable(
                name: "AutosAutomivilistas");

            migrationBuilder.DropTable(
                name: "Multas");

            migrationBuilder.DropTable(
                name: "Autos");

            migrationBuilder.DropTable(
                name: "Automovilistas");
        }
    }
}
