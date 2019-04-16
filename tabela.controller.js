"use strict";

function TabelaController(){

	this.body = document.getElementById('body');

	this.atualizar = function(medicamento, row){
		if(row)
			this.body.replace(this.criarRow(medicamento), row);
		else
			this.body.appendChild(this.criarRow(medicamento));
	mensagem.carregar(medicamento);
	}

	this.criarRow = function(medicamento){
		var row = document.createElement('tr');
		row.appendChild(this.colunaNumero(medicamento));
		row.appendChild(this.colunaNome(medicamento));
		row.appendChild(this.colunaControlado(medicamento));
		row.appendChild(this.colunaCategoria(medicamento));
		row.appendChild(this.colunaComplemento(medicamento));
		row.appendChild(this.colunaBotoes(medicamento, row));
		return row;
	}

	this.colunaNome = function(medicamento){
		var coluna = document.createElement('td');
		coluna.innerHTML = medicamento.nome;
		return coluna;
	}

	this.colunaNumero = function(medicamento){
		var coluna = document.createElement('td');
		coluna.innerHTML = medicamento.numero;
		return coluna;
	}

	this.colunaControlado = function(medicamento){
		var coluna = document.createElement('td');
		if(medicamento.controlado ==='Sim'){
			coluna.innerHTML = 'Controlado';
		}else{
			coluna.innerHTML = 'Não controlado';
		}
		return coluna;
	}

	this.colunaCategoria = function(medicamento){
		var coluna = document.createElement('td');
		coluna.innerHTML = medicamento.categoria;
		return coluna;
	}

	this.colunaComplemento = function(medicamento){
		var coluna = document.createElement('td');
		if(medicamento.categoria === 'Genérico')
			coluna.innerHTML = medicamento.referencia;
		if(medicamento.categoria === 'Biológico')
			coluna.innerHTML = medicamento.subcategoria;

		return coluna;
	}


	this.colunaBotoes = function(medicamento, row){
		var coluna = document.createElement('td');
		var div = document.createElement('div');
		div.className = 'btn-group btn-group-sm';
		div.appendChild(this.botaoAlterar(medicamento));
		div.appendChild(this.botaoExcluir(medicamento, row));
		coluna.appendChild(div)
		return coluna;
	}

	this.botaoAlterar = function(medicamento){
		var button = document.createElement('button');
		button.innerHTML = 'Alterar';
		button.className = 'btn btn-danger';
		button.onclick = function(){
			formulario.alterar(medicamento);
		}
		return button;
	}

	this.botaoExcluir = function(medicamento, row){
		var button = document.createElement('button');
		button.innerHTML = 'Excluir';
		button.className = 'btn btn-dark'
		button.onclick = function(){
			row.parentElement.removeChild(row);
			mensagem.carregar(medicamento);
		}
		return button;
	}



}