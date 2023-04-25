using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Exercicio.Controllers
{
    public class ProdutoController : Controller
    {
        // GET: Produto
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Produto()
        {
            //ViewBag.usuario = Session["USUARIO"];
            var user = Session["USUARIO"];
            ViewBag.usuario = user;
            return View();
        }
    }
}