using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;


namespace Exercicio.Models
{
    //Objetos do tipo Bson = Json Binário do MongoDB
    [BsonIgnoreExtraElements]
    public class Usuario
    {
        [BsonId]
        public ObjectId _id { get; set; }  
        public string nome { get; set; }
        public string senha{ get; set; }
        public string email{ get; set; }
        public string flag{ get; set; }
    } 
    
    public class DadosId
    {
       public string indice { get; set; }  
       
    }
}