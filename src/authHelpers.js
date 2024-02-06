const clientId = "e6fb6e00e14f4df2b11fd3c6bd3985f3";
// let accessToken = localStorage.getItem("accessToken") == 'undefined' ? null : localStorage.getItem("accessToken");

export const handleAuth = async isRefresh => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (isRefresh) {
        getToken(clientId, code, true);
    } else if (!code) {
        //TODO: Fix having to clikc button again to get access token cause of not calling getToken after
        redirectToAuth(clientId);
    } else {
        await getToken(clientId, code);
    }
    //get Promise back from getAccessToken and handle setting/rejection here
}

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

export const getToken = async (clientId, code, isRefresh = false) => {

    const params = new URLSearchParams();
    let expireDate = new Date();

    if (isRefresh) {
        const refreshToken = localStorage.getItem("refreshToken");

        params.append("grant_type", "refresh_token");
        params.append("refresh_token", refreshToken);
        params.append("client_id", clientId);
    } else {
        const verifier = localStorage.getItem("verifier");

        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:3000");
        params.append("code_verifier", verifier);
    }

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params
    });

    const resultJson = await result.json();

    const { access_token, expires_in, refresh_token } = resultJson;
    if (!resultJson.error) {
        expireDate.setSeconds(expireDate.getSeconds() + parseInt(expires_in));
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("expiresDate", expireDate);
        localStorage.setItem("refreshToken", refresh_token);

        const tokenEvent = new Event("tokenUpdate");
        window.dispatchEvent(tokenEvent);
    }
}

// TODO make a Promise to reject on error

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