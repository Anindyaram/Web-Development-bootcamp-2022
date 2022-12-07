const req = new XMLHttpRequest();

req.onload = function(){
    console.log("IT Loaded");
    console.log(this.responseText);
    const data = JSON.parse(this.responseText);
    console.log(data);
    console.log(data.name , data.hair_color)
}

req.onerror = function(){
    console.log("ERROR!!!");
    console.log(this);
}

req.open("GET","https://swapi.dev/api/people/1/");
req.send();

