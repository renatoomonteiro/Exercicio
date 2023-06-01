using MongoDB.Bson;

namespace Exercicio.Controllers
{
    internal class MyImageModel
    {
        public BsonBinaryData Data { get; set; }
        public object Id { get; internal set; }
    }
}