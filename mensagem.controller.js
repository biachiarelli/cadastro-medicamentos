"use strict";

function MensagemController(){

	this.tabela = document.getElementById('tabela');
	this.vazio = document.getElementById('vazio');
	this.mensagens = document.getElementById('mensagens');

	this.erro = [];

	this.carregar = function(medicamento){
		var quantidade = document.querySelectorAll('#body > tr').length;
		if(quantidade){
			this.tabela.classList.remove('d-none');
			this.vazio.classList.add('d-none');
		}else{
			this.tabela.classList.add('d-none');
			this.vazio.classList.remove('d-none');
		}
		this.mensagemTela();
	}

	this.mensagemTela = function(){
		this.mensagens.innerHTML = '';
		for(var i in this.erro){
			var div = document.createElement('div');
			div.className = 'alert alert-danger';
			div.innerHTML = this.erro[i];
			this.mensagens.appendChild(div);
		}
		this.erro = [];
	}

	this.erroTela = function(msg){
		this.erro.push(msg);
	}

}