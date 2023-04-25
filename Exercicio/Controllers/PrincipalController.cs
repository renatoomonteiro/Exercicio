using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Exercicio.Controllers
{
    public class PrincipalController : Controller
    {
        // GET: Principal
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult Principal()
        {
            var user = Session["USUARIO"];
            //ViewBag do tipo usuário, recebe as informações de user, tais como 
            //nome, email e senha
            ViewBag.usuario = user;    
            
            return View();
        }


    }
}