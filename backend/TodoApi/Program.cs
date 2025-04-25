using TodoApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin() 
                   .AllowAnyMethod() 
                   .AllowAnyHeader(); 
        });
});
//

builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))); 

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

using (var scope = app.Services.CreateScope()){
    var db = scope.ServiceProvider.GetRequiredService<TodoContext>();
    db.Database.Migrate();
}

app.UseCors("AllowAllOrigins");
app.MapControllers();

app.Run();