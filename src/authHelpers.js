//TODO: Move all auth code and handling to this file and call helpers

const clientId = "e6fb6e00e14f4df2b11fd3c6bd3985f3";
let accessToken = localStorage.getItem("accessToken") == 'undefined' ? null : localStorage.getItem("accessToken");

export const handleAuth = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
        redirectToAuth(clientId);
    } else {
        accessToken = await getAccessToken(clientId, code);
    }
    //get Promise back from getAccessToken and handle setting/rejection here
}

// TODO make a Promise to reject on error
export const redirectToAuth = async (clientId) => {
    const verifier = generateCodeVerifier(128);
    const code = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", code);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

// TODO make a Promise to reject on error
export const getAccessToken = async (clientId, code) => {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params
    });
    //Check status of result, if 4xx reject

    console.log(result);
    const resultJson = await result.json();
    console.log(resultJson);
    const { access_token, expires_in, refresh_token } = resultJson;
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("expiresIn", expires_in);
    localStorage.setItem("refreshToken", refresh_token);
    return access_token;
};

const generateCodeVerifier = length => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const generateCodeChallenge = async verifier => {
    const data = new TextEncoder().encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};