    document.querySelector('.reg-button').onclick = async () => {
        
        let email = document.getElementById('email').value;

        let password = document.getElementById('password').value;

        let confirmPassword = document.getElementById('confirm-password').value;

        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        if (email.length == 0) {
            return;
        }

        if(password != confirmPassword){

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
