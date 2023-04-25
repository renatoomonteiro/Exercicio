using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Exercicio.Controllers
{
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult Index()
        {
            return View();
        } 
        public ActionResult Cliente()
        {
            ViewBag.usuario = Session["USUARIO"];
            return View();
        }
    }
}