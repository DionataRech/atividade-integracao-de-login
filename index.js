async function login(event) {
  event.preventDefault();
  try {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    const data = {
      email: email,
      senha: senha,
    };

    localStorage.setItem("formularioEnviado", JSON.stringify(data));

    const dataSalvo = JSON.parse(localStorage.getItem("formularioEnviado"));

    const response = await api.post("usuario/login", dataSalvo);

    const respostaLogin = document.getElementById("respostaLogin");

    respostaLogin.innerHTML = ` <h1>Seja Bem vindo ${email} </h1>`;
  } catch (error) {
    alert("Email nao cadastrado !!!");
  }
}

////////////////PRECISO FAZER A FUNCAO DE LINK DE UMA PAGINA PARA A OUTRA /////////// BOTAO LOGIN PARA A PAGINA DE RECADOS ////////////////////////////

///////////////NOS RECADOS APARECER QUEM ESTA LOGADO (CONSULTAR LOCALSOTRAGE)E APARECER ID DE  USUARIO /////////////////////////

//////////////CONSTRUIR ENDPOINT DE CRIAR RECADOS E ATUALIZAR RECADOS  POR PARAMETROS     ////////////////////////////////////

//////////////// DEPOIS CRIAR ENDPOINT DE DELETAR USUARIO OU  RECADO POR PARAMETRO        ///////////////////////

async function criarUsuario(event) {
  event.preventDefault();

  try {
    const nome = document.getElementById("criarNome").value;
    const email = document.getElementById("criarEmail").value;
    const senha = document.getElementById("criarSenha").value;

    console.log(nome, email, senha, "Aqui estao os dados do primeiro filtro");

    const data = {
      nome: nome,
      email: email,
      senha: senha,
    };
    console.log(data, "Aqui estao os dados do segundo filtro");

    localStorage.setItem("novoUsuario", JSON.stringify(data));

    const salvarDados = JSON.parse(localStorage.getItem("novoUsuario"));

    const response = await api.post("/usuarios", salvarDados);

    const usuariocriado = document.getElementById("usuarioCriado");

    usuariocriado.innerHTML = `<b> Usuario ${data.nome} criado com sucesso </b>`;
  } catch (error) {
    alert("Error , preencha os campos obrigatorios");
  }
}
