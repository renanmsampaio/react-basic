const msalConfig = {
    auth: {
        clientId: "6f32c3d0-001b-4f1b-91ec-0abecfc9c3f2",
        authority: "https://login.microsoftonline.com/a677c06b-f6e8-43f8-b1ad-f9c2b9542d42", // Tenant ID
        redirectUri: "https://gray-flower-0ca146c03.6.azurestaticapps.net/",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

async function login() {
    try {
        const loginResponse = await msalInstance.loginPopup({
            scopes: ["openid", "profile", "User.Read"]
        });
        console.log("Login bem-sucedido:", loginResponse);
        document.getElementById("status").innerText = `Bem-vindo, ${loginResponse.account.username}`;
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
    } catch (error) {
        console.error("Erro no login:", error);
    }
}

function logout() {
    msalInstance.logoutPopup().then(() => {
        document.getElementById("status").innerText = "Você saiu!";
        document.getElementById("loginBtn").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";
    });
}

// Event listeners para botões
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("logoutBtn").addEventListener("click", logout);
