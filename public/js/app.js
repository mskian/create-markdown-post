var el = document.querySelector('#postData');
if (el) {
    el.addEventListener('submit', postData);
}

function postData(event) {
    event.preventDefault();
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let postcontent = document.querySelector('#postcontent').value;
    let tag = document.querySelector('#tag').value;
    if (title == 0 || description == 0) {
        console.log('Empty Title or Message');
        document.getElementById("notice").innerHTML = '<div class="notification is-danger">Empty Title or Message</div>';
    } else {
        const data = {
            title: title,
            description: description,
            postcontent: postcontent,
            tag: tag
        };
        const url = '/post';
        const send = document.querySelector('#push');
        send.classList.add("is-loading");

        axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: url,
                data: JSON.stringify(data),
            })
            .then(
                el.reset(),
                setTimeout(() => {
                    send.classList.remove("is-loading");
                }, 800),
            )
            .then(function(response) {
                if (response.status == '200') {
                    console.log(response.data);
                    document.getElementById("notice").innerHTML = '<div class="notification is-success"><span>DATA Posted Successfully</span><div>';
                } else {
                    document.getElementById("notice").innerHTML = '<p>Something is Missing</p>';
                }
            })
            .catch(function(error) {
                if (!error.response) {
                    console.log('oops Enter a API Valid URL');
                    document.getElementById("notice").innerHTML = '<div class="notification is-danger">Enter a Valid API Data</div>';
                } else if (error.errno === 'ECONNREFUSED') {
                    console.log('Enter a Valid API URL');
                    document.getElementById("notice").innerHTML = '<div class="notification is-danger">Enter a Valid API Data</div>';
                } else if (error.errno === 'ENOTFOUND') {
                    console.log('URL ERROR');
                    document.getElementById("notice").innerHTML = '<div class="notification is-danger">URL ERROR</div>';
                } else if (error.response.status == '400') {
                    console.log('Bad Request');
                    document.getElementById("notice").innerHTML = '<div class="notification is-danger">Bad Request or Empty Value</div>';
                } else if (error.response.status == '401') {
                    console.log('Unauthorized Error - Invalid Token');
                    document.getElementById("notice").innerHTML = '<div class="notification is-danger">Unauthorized Error - Invalid Token</div>';
                } else if (error.response.status == '403') {
                    console.log('Forbidden');
                    document.getElementById("notice").innerHTML = '<div class="notification is-danger">Forbidden</div>';
                } else if (error.response.status == '404') {
                    console.log('API URL Not Found');
                    document.getElementById("notice").innerHTML = '<div class="notification is-danger">API URL Not Found</div>';
                } else {
                    console.log('Hmm Something Went Wrong or HTTP Status Code is Missing');
                }
            });
    }
}