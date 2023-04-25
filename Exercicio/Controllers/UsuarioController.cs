using Exercicio.BLL;
using Exercicio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Exercicio.Controllers
{
    public class UsuarioController : Controller
    {
        // GET: Usuario
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GerenciarUsuario()
        {
            var user = Session["USUARIO"];
            ViewBag.usuario = user;
            return View();
        }

        [HttpPost]
        public ActionResult GetListaUsuario()
        {
            BLL_Usuario _bllUser = new BLL_Usuario();

            var retorno = _bllUser.GetListaUsuario();

            //if (retorno != null)
            //{
            //    Session["USUARIO"] = (Usuario)retorno;
            //}

            return Json(new
            {
                retornoListaUsuario = retorno
            });
        }

        [HttpPost]
        public ActionResult DeletarUsuario(DadosId id)
        {
            BLL_Usuario _bllUser = new BLL_Usuario();

            var retorno = _bllUser.DeletarUsuario(id);

         
            return Json(new
            {
                retDelete = retorno
            });
        }

    }
}