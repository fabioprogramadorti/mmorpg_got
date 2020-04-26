module.exports.jogo = function (application, req, res) {
    if(req.session.autorizado != true){
        res.send("Usuario precisa fazer login");
    }

    var msg = " ";
    if(req.query.msg != " "){
        msg = req.query.msg;
    }


    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);    

    jogoDAO.iniciaJogo(res, usuario, casa, msg);
}


module.exports.sair = function (application, req, res) {
    req.session.destroy(function (err) {
        res.render("index", {validacao: {}});
    })
}

module.exports.suditos = function (application, req, res) {    
    if(req.session.autorizado !== true){
        res.send("Usuario precisa fazer login");
    }

    res.render("aldeoes", {validacao: {}});    
}

module.exports.pergaminhos = function (application, req, res) {  
    if(req.session.autorizado !== true){
        res.send("Usuario precisa fazer login");
    }

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);    

    var usuario = req.session.usuario;

    jogoDAO.getAcoes(usuario, res);
  
    // res.render("pergaminhos", {validacao: {}});    
}


module.exports.ordenar_acao_sudito = function (application, req, res) {    
    if(req.session.autorizado !== true){
        res.send('Usuário precisa fazer login');
        return;
    }
    
    var dadosForm = req.body;

	req.assert('acao', 'Ação deve ser informada').notEmpty();
	req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);    

    dadosForm.usuario = req.session.usuario;
    jogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');
}

