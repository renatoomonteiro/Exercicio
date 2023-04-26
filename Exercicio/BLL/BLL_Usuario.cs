using Exercicio.DAL;
using Exercicio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Exercicio.BLL
{
    public class BLL_Usuario
    {
        //Todas as regras de cadastro de usuário ficarão aqui

        DAL_Usuario _dalUser = new DAL_Usuario();

        public string CadastrarUsuario(Usuario user)
        {
            var retorno = _dalUser.CadastrarUsuario(user);

            return retorno;
        } 
        public Usuario Login(Usuario user)
        {
            var retorno = _dalUser.Login(user);

            return retorno;
        }
        public string GetListaUsuario()
        {
            var retorno = _dalUser.GetListaUsuario();

            return retorno;
        }
        public string DeletarUsuario(DadosId id)
        {
            var retorno = _dalUser.DeletarUsuario(id);
            return retorno; 
        }
            
    }
}