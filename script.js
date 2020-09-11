const regex = /https:\/\/discordapp\.com\/api\/webhooks\/\d+\/[a-zA-Z0-9-]+/gm;

document.getElementById("btn").onclick = () => {
    submit();
}

document.onkeydown = (evt) => {
    evt = evt || window.event;
    if (evt.code == "Enter") {
        submit();
    }
};

const submit = () => {
    let whUrl = document.getElementById("whUrl").value;
    let body = {
        "content": document.getElementById("content").value,
        "username": document.getElementById("username").value,
        "avatar_url": document.getElementById("avatar").value,
    }
    if (!regex.test(whUrl)) {
        log({ "message": "A URL is required to send a request", "code": 1 })
        return false;
    } else {
        post(whUrl, body).then(data => {
            log(data);
        });
    }
}

const post = (whUrl, body) => {

    if (body.content == null || body.content == "") {
        return fetch(whUrl + "?wait=true",
            {
                "method": "GET",
            })
            .then(data => data.json())
    } else {
        return fetch(whUrl + "?wait=true",
            {
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "body": JSON.stringify(body)
            })
            .then(data => data.json())
    }
}

log({ message: { "step one": "Paste your discord webhook URL into the Webhook URL textbox", "step two": "Type your message into the Content textbox", "step three": "Click the Send button", }, "code": 0 })

const log = (data) => {
    document.getElementById("log").innerHTML = `Reply: ${JSON.stringify(data, null, 2)}`
}
