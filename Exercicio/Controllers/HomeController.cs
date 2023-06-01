using Exercicio.BLL;
using Exercicio.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace Exercicio.Controllers
{
    public class HomeController : Controller
    {
        private readonly IMongoCollection<MyImageModel> _collection;

        public HomeController()
        {
            // Conexão com o banco MongoDB
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("IMAGENS");
            _collection = database.GetCollection<MyImageModel>("images");
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Mensagem sobre a página.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public ActionResult CadastrarUsuario(Usuario user)
        {

            BLL_Usuario _bllUser = new BLL_Usuario();

            var retorno = _bllUser.CadastrarUsuario(user);

            return Json(new 
            {
                ret= retorno
            });
        }

        [HttpPost]
        public ActionResult Login(Usuario user)
        {
            BLL_Usuario _bllUser = new BLL_Usuario();

            var retorno = _bllUser.Login(user);

            if(retorno != null) 
            {
                Session["USUARIO"]=(Usuario)retorno;
            }

            return Json(new
            {
                user = retorno
            });
        }

        [HttpPost]
        public ActionResult EditarUsuario(string IdEdit, string nome, string email, string sexo, string endereco, string dtNascimento, string flag)
        {

            BLL_Usuario _bllUser = new BLL_Usuario();

            var retorno = _bllUser.EditarUsuario(IdEdit, nome, email, sexo, endereco, dtNascimento, flag);

            return Json(new
            {
                ret = retorno
            });
        }

        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                // Le a imagem como um array de bytes
                byte[] imageBytes = new byte[file.ContentLength];
                
                file.InputStream.Read(imageBytes, 0, imageBytes.Length);

                //using (var memoryStream = new MemoryStream())
                //{
                //    file.InputStream.CopyTo(memoryStream);
                //    imageBytes = memoryStream.ToArray();
                //}

                // Cria um objeto MyImageModel para inserir no banco
                var imageModel = new MyImageModel
                {
                    Data = imageBytes
                };
                // Insere o modelo no banco
                _collection.InsertOne(imageModel);
            }

            return RedirectToAction("Index");

        }


        public ActionResult ShowImage(string id)
        {
            //Obtem a imagem com o ID especifico
            var image = _collection.Find(x => x.Id == ObjectId.Parse(id)).FirstOrDefault();

            if (image != null)
            {
                //Cria um objeto FileContentResult para exibir a imagem
                return new FileContentResult((byte[])image.Data, "image/jpeg");
            }

            return HttpNotFound();

        }

    }
}