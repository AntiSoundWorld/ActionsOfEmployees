    document.getElementById('reg-button').onclick = async () => {

        let form = document.getElementById('registartionForm');
        
        let email = document.getElementById('email').value;

        let password = document.getElementById('password').value;
        let comfirmPassword = document.getElementById('comfirm-password').value;


        if (email.length == 0) {
            return;
        }

        if(password != comfirmPassword){

            let err = document.createElement('h1');
            console.log(err);
            err.setAttribute('value', 'error');
            err.setAttribute('class', 'error');

            form.appendChild(err);
            return;
        }

        let basicToken = "Basic " + btoa(email + ":" + password);

        let response = await fetch(window.location.href + `registration?email=${email}`, {
            method: 'POST',
            headers: {
                'Authorization': basicToken
            }
        });

        if(response.status == 200){
            window.open('/access_bitbucket', "_self");
        }
    };
