using Exercicio.BLL;
using Exercicio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace Exercicio.Controllers
{
    public class HomeController : Controller
    {
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

    }
}