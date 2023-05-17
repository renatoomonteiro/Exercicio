using Exercicio.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Exercicio.DAL
{
    public class DAL_Usuario
    {
        //Todos o dados de acesso ao BD, referentes ao Usuário, ficarão aqui
        public string CadastrarUsuario(Usuario user)
        {
            try
            {
                //Chamar a conexão com o banco aqui
                //tipo de dado, nome da variável no Web config, gerenciador de conexão com o nome da tag
                string conexaoMongoDB = ConfigurationManager.ConnectionStrings["conexaoMongoDB"].ConnectionString;
                //Instância do MongoClient com os drivers
                var client = new MongoClient(conexaoMongoDB);
                //Qual a base de dados que se pretende trabalhar                  
                var db = client.GetDatabase("EXERCICIO");
                // Utiliza a interface do Mongo para criar uma coleção do tipo Usuário
                IMongoCollection<Usuario> colecao = db.GetCollection<Usuario>("usuario");
                //Inserção do objeto usuário        
                colecao.InsertOne(user);
                //Mensagem de retorno
                return "ok";
            }
            catch (Exception ex)
            {
                //Mensagem caso dê erro
                return ex.Message;
            }            
        }


        public Usuario Login(Usuario user)
        {
            try
            {
                //Chamar a conexão com o banco aqui
                //tipo de dado, nome da variável no Web config, gerenciador de conexão com o nome da tag
                string conexaoMongoDB = ConfigurationManager.ConnectionStrings["conexaoMongoDB"].ConnectionString;
                //Instância do MongoClient com os drivers
                var client = new MongoClient(conexaoMongoDB);
                //Qual a base de dados que se pretende trabalhar                  
                var db = client.GetDatabase("EXERCICIO");
                // Utiliza a interface do Mongo para criar uma coleção do tipo Usuário
                IMongoCollection<Usuario> colecao = db.GetCollection<Usuario>("usuario");
                //Faz uma seleção de acordo com os parâmetros informados
                var filtro = Builders<Usuario>.Filter.Where(u => u.email == user.email && u.senha == user.senha);
                //variável de retorno do banco .ToList<Usuario>()
                var result = colecao.Find<Usuario>(filtro).FirstOrDefault();
                //Variável que irá retornar o objeto json p/ a aplicação, no formato string
                //string jsonResult = JsonConvert.SerializeObject(result, Formatting.None);

                
                return result;
            }
            catch (Exception ex)
            {
                //Mensagem caso dê erro
                return null;
                //Grava no log de erro
                throw new Exception("Usuário não existe na base!", ex);
            }
        }
        public string GetListaUsuario()
        {
            try
            {
                
                string conexaoMongoDB = ConfigurationManager.ConnectionStrings["conexaoMongoDB"].ConnectionString;
                var client = new MongoClient(conexaoMongoDB);
                var db = client.GetDatabase("EXERCICIO");
                IMongoCollection<Usuario> colecao = db.GetCollection<Usuario>("usuario");
                var filtro = Builders<Usuario>.Filter.Where(u => u.flag == "1");
                var result = colecao.Find<Usuario>(filtro).ToList<Usuario>();
             
                string jsonresult = Newtonsoft.Json.JsonConvert.SerializeObject(result, Formatting.None);    
                
                return jsonresult;
            }
            catch (Exception ex)
            {
                return null;
                throw new Exception("Usuário não existe na base!", ex);
            }
        }

        public string DeletarUsuario(DadosId id)
        {
            try
            {
                string conexaoMongoDB = ConfigurationManager.ConnectionStrings["conexaoMongoDB"].ConnectionString;
                var client = new MongoClient(conexaoMongoDB);
                var db = client.GetDatabase("EXERCICIO");
                IMongoCollection<Usuario> colecao = db.GetCollection<Usuario>("usuario");
                var filtro = Builders<Usuario>.Filter.Where(u => u._id == ObjectId.Parse(id.indice));
                
                Usuario _user = colecao.Find(filtro).FirstOrDefault();
                

                if (_user != null)
                {
                    _user.flag = "0";
                    ReplaceOneResult result = colecao.ReplaceOne(filtro, _user);
                    return _user.nome;
                }

                else
                {
                    return "Erro!";
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        public string EditarUsuario(string IdEdit, string nome, string email, string sexo, string endereco, string dtNascimento, string flag)
        {
            try
            {
                string conexaoMongoDB = ConfigurationManager.ConnectionStrings["conexaoMongoDB"].ConnectionString;
                var client = new MongoClient(conexaoMongoDB);
                var db = client.GetDatabase("EXERCICIO");
                IMongoCollection<Usuario> colecao = db.GetCollection<Usuario>("usuario");
                var filtro = Builders<Usuario>.Filter.Where(u => u._id == ObjectId.Parse(IdEdit));

                Usuario _user = colecao.Find(filtro).FirstOrDefault();

                if (_user != null)
                {
                    _user.nome = nome;
                    _user.email = email;
                    _user.endereco = endereco;
                    _user.dtNascimento = dtNascimento;
                    _user.sexo = sexo;
                    _user.flag = flag;

                    ReplaceOneResult result = colecao.ReplaceOne(filtro, _user);
                    return _user.nome;
                }

                else
                {
                    return "Erro!";
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
    }

