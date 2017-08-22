var express = require("express");//pull in the express dependency
var app = express(); // app is the primary variable
var bodyParser = require("body-parser"); //to post data we need body parser
//temp database like an object
var products = [
{
    id: 1,
    name: "laptop"
},
{
    id: 2,
    name: "microwave" 
}
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
//define route
app.get('/products', function(req, res){
// default method is GET so we dont have to define it
 res.send({products: products});
});

app.post('/products', function(req, res){
    var productName = req.body.name;
    /*we did body.name since we have declared data: JSON.stringify({name:createInpt.val()})*/
    currentId++;

    //push the data in temp database
    products.push({
        id: currentId,
        name: productName
    });
    res.send('successfully created product!');

});

app.put('/products/:id', function(req, res){
    var id = req.params.id;
    var newName = req.body.newName;
    console.log(newName);
    console.log(id+ ' from the server side ');

    var found = false; //for iteration
    products.forEach(function(product,index){
        if(!found && (product.id === Number(id)))
            {
                
                
                product.name = newName;
            }
    });
    res.send('successfully updated!');
});


app.delete('/products/:id', function(req, res){
    var id = req.params.id;
    var newName = req.body.newName;
    console.log(newName);
    console.log(id+ ' from the server side ');

    var found = false; //for iteration
    products.forEach(function(product,index){
        if(!found && (product.id === Number(id)))
            {
                products.splice(index,1); //to delete at that index
                
                            }
    });
    res.send('successfully deleted!');
});

app.listen(PORT, function(){
    console.log('server listening on ' + PORT);
});