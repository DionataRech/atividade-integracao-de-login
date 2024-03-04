//////////////---LOGIN USUARIO---////////////////

async function login(event) {
  event.preventDefault();
  try {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const nome = document.getElementById("nome").value;
    const data = {
      email: email,
      senha: senha,
    };

    localStorage.setItem("formularioEnviado", JSON.stringify(data));

    const dataSalvo = JSON.parse(localStorage.getItem("formularioEnviado"));

    const response = await api.post("usuario/login", dataSalvo);

    const respostaLogin = document.getElementById("respostaLogin");

    localStorage.removeItem("formularioEnviado");

    localStorage.setItem("userEmail", email);
    localStorage.setItem("nomeUsuario", nome);

    respostaLogin.innerHTML = ` <h1>Login efetuado com sucesso, ${nome} !!!</h1>`;
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

////////////---USUARIO  QUE ESTA LOGADO (ONLINE) ---////////////////
function verificarstatus(event) {
  event.preventDefault();
  try {
    const userName = localStorage.getItem("nomeUsuario");
    const emailLogado = localStorage.getItem("userEmail");
    const usuarioLogado = document.getElementById("usuarioLogado");

    if (emailLogado) {
      usuarioLogado.innerHTML = `<h1>Seja Bem Vind ${userName} Voce esta Logado!!!</h1>`;

      usuarioLogado.style.backgroundColor = "lightblue";
      usuarioLogado.style.textAlign = "center";
    } else {
      window.location.href = "./index.html";
    }
  } catch (error) {}
}
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

//////////////// Atualizar recados - Listar Recados    ///////////////////////

async function atualizarRecados(event) {
  event.preventDefault();
  try {
    const emailParametro = document.getElementById("parametroEmail").value;
    const response = await api.get(`recados/${emailParametro}`);
    const mostrarRecados = response.data.data;

    const recadoDiv = document.getElementById("atualizarRecados");

    mostrarRecados.forEach((message) => {
      const msgRecado = document.createElement("div");
      msgRecado.innerHTML = `<p> Email: ${message.email}</p><p> ID: ${message.id}</p><p> Titulo: ${message.titulo}</p><p> Mensagem: ${message.descricao}</p>`;

      recadoDiv.appendChild(msgRecado);
    });
  } catch (error) {
    console.log("VAMOS DEBUGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR ");
  }
}

//////////////////////DELETAR USUARIO ///////////////////////////////////

async function deletarUsuario(event) {
  event.preventDefault();
  try {
    const emailDeletado = document.getElementById("emailDeletado").value;
    const response = await api.delete(`usuario/delete/${emailDeletado}`);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("nomeUsuario");
    alert("VOCE DELETOU SEU USUARIO!!!!");
  } catch (error) {
    alert("VAMOOOOOOOOO DEBUGARRRRRRRRRRRRR");
  }
}
