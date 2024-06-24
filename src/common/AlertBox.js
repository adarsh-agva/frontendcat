window.alert=function (message,timeout=null) {
    const alert=document.createElement('div');
    alertButton.innerText='OK'
    alert.classList.add('alert');
    alert.setAttribute('style',
    `position:fixRequestBody;
    top:50%;
    left:50%;
    padding:20px;
    border-radious:10px;
    box-shadow:0 10px 5px 0 #0000044`,
    );
    alert.innerText=message;
    document.body.appendChild(alert);
}