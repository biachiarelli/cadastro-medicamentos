"use strict";

function FormularioController(){

	this.buttonCadastrar = document.getElementById('cadastrar');
	this.buttonLimpar = document.getElementById('limpar');

	this.nome = document.getElementById('nomeComercial');
	this.numero = document.getElementById('numeroRegistro');
	this.categoria = document.getElementById('categoria');
	this.referencia = document.getElementById('medicamentoReferencia');
	this.subcategoria = document.getElementById('subcategoria');
	this.formulario = document.getElementById('formulario');

	this.row = null;

	this.buttonCadastrar.onclick = function(){
		formulario.salvar();
	}

	this.buttonLimpar.onclick = function(){
		formulario.limpar();
	}

	this.obterMedicamento = function(){
		var controlado = document.querySelector('input[name=controlado]:checked');
		return{ 
			nome: this.nome.value,
			numero: this.numero.value,
			controlado: controlado ? controlado.value : '',
			categoria: this.categoria.value,
			referencia: this.referencia.value,
			subcategoria: this.subcategoria.value
		}
	};

	this.imprimirMedicamento = function(medicamento){
		var controlado = document.querySelector('input[name=controlado][value="'+ medicamento.controlado +'"')
		controlado.checked = true;
		this.nome.value = medicamento.nome;
		this.numero.value =  medicamento.numero;
		this.categoria.value = medicamento.categoria;
		this.referencia.value = medicamento.referencia;
		this.subcategoria.value	= medicamento.subcategoria;
	};


	this.salvar = function(){
		var medicamento = this.obterMedicamento();
		if(this.validacao(medicamento)){
			tabela.atualizar(medicamento, this.row);
			formulario.limpar();
		}	
		mensagem.carregar();
	};

	this.limpar = function(){
		this.formulario.reset();
		this.row = null;
		mensagem.carregar();
	};

	this.alterar = function(medicamento, row){
		this.imprimirMedicamento(medicamento);
		this.row = row;
	};

	this.validacao = function(medicamento){
		console.log(medicamento);
		var validado = true;
		if(formulario.nomeVazio(medicamento)){
			mensagem.erroTela('Nome comercial vazio');
			validado = false;
		}
		if(formulario.numeroVazio(medicamento)){
			mensagem.erroTela('Numero de registro vazio');
			validado = false;
		}
		if(formulario.controladoVazio(medicamento)){
			mensagem.erroTela('Campo de remédio controlado vazio');
			validado = false;
		}
		if(formulario.categoriaVazio(medicamento)){
			mensagem.erroTela('Categoria vazio');
			validado = false;
		}
		if(formulario.referenciaVazio(medicamento)){
			mensagem.erroTela('Medicamento de referência vazio');
			validado = false;
		}
		if(formulario.subcategoriaVazio(medicamento)){
			mensagem.erroTela('Subcategoria vazio');
			validado = false;
		}
		if(formulario.registroExistente(medicamento, this.row)){
			mensagem.erroTela('Número de registro ja existente');
			validado = false;
		}
		if(formulario.registroFormato(medicamento)){
			mensagem.erroTela('Número de registro com formato inválido.');
			mensagem.erroTela(' O número de registro deve possuir duas letras maiúsculas iniciais, quatro números e uma letra maiúscula final, sendo que a letra final N(Novo), G(Genérico) ou B(Biológico. Exemplo: AB0001G.')

			validado = false;
		}
		return validado;
	}


	this.nomeVazio = function(medicamento){
		console.log(medicamento.nome);
		if (medicamento.nome == ''){ 
			return true;
		}else
		return false;
	}

	this.numeroVazio = function(medicamento){
		if (medicamento.numero == ''){
			return true;
		}else
		return false;
	}

	this.controladoVazio = function(medicamento){
		if (medicamento.controlado == '') {
			return true;
		}else
		return false;
	}

	this.categoriaVazio = function(medicamento){
		if (medicamento.categoria == ''){ 
			return true;
		}else
		return false;
	}

	this.referenciaVazio = function(medicamento){
		if (medicamento.categoria == 'Genérico' && medicamento.referencia == '') {
			return true;
		}else
		return false;
	}

	this.subcategoriaVazio = function(medicamento){
		if (medicamento.categoria == 'Biológico' && medicamento.subcategoria == '') 
			return true;
		else
			return false;
	}

	this.registroExistente = function(medicamento, row){
		var numeros = document.querySelectorAll('#body > tr > td:first-child');
		
		for(var i=0; i< numeros.length; i++ && numeros[i].parentElement != row){
			if(medicamento.numero == '')
				return true;
		}
		return false;
	}

	this.registroFormato = function(medicamento){
		if(/[A-Z]{2}[0-9]{4}[N,G,B]{1}/.test(medicamento.numero)){
			return false;
		}else
		return true;
	}

}

