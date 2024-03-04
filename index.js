//////////////---LOGIN USUARIO---////////////////

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

    localStorage.removeItem("formularioEnviado");

    respostaLogin.innerHTML = ` <h1>Login efetuado com sucesso, ${email} !!!</h1>`;

    localStorage.setItem("userEmail", email);
    window.location.href = "./recados.html";
  } catch (error) {
    alert("Email ou Senha incorretos, verifique se voce esta cadastrado !!!");
  }
}

//////////////---CRIAR USUARIO---////////////////
async function criarUsuario(event) {
  event.preventDefault();

  try {
    const nome = document.getElementById("criarNome").value;
    const email = document.getElementById("criarEmail").value;
    const senha = document.getElementById("criarSenha").value;

    const data = {
      nome: nome,
      email: email,
      senha: senha,
    };

    localStorage.setItem("novoUsuario", JSON.stringify(data));

    const salvarDados = JSON.parse(localStorage.getItem("novoUsuario"));

    const response = await api.post("/usuarios", salvarDados);

    const usuarioCriado = document.getElementById("usuarioCriado");

    localStorage.removeItem("novoUsuario");

    usuarioCriado.textContent = ` Seja Bem vindo ${email} `;
  } catch (error) {
    alert("Error , preencha os campos obrigatorios");
  }
}

//////////////---USUARIO  QUE ESTA LOGADO (ONLINE) ---////////////////

const emailLogado = document.getElementById("usuarioLogado");
const email = localStorage.getItem("userEmail");

emailLogado.innerText = "seja bem vindo";

//////////////---CRIAR RECADO DO USUARIO QUE ESTA LOGADO ---////////////////

let contador = 1;

async function criarRecados(event) {
  event.preventDefault();

  try {
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const emailLocal = localStorage.getItem("userEmail");

    const dadosRecado = {
      id: contador,
      email: emailLocal,
      titulo: titulo,
      descricao: descricao,
    };

    localStorage.setItem("novoRecado", JSON.stringify(dadosRecado));
    const recadosSalvos = JSON.parse(localStorage.getItem("novoRecado"));
    contador++;

    const response = await api.post(
      `criarRecados/${emailLocal}`,
      recadosSalvos
    );

    const mostrarRecado = document.getElementById("mostrarRecados");
    mostrarRecado.innerHTML = `Seu recado  foi criado com Sucesso`;
  } catch (error) {
    alert("Opa meu bom Deu algum erro ae , VAMOS DEBUGAR!!!");
  }
}

//////////////// DEPOIS CRIAR ENDPOINT DE DELETAR USUARIO OU  RECADO POR PARAMETRO        ///////////////////////
