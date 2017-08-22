$(function(){
    //GET/READ
    $('#get-button').on('click',function(){
        //console.log('test');

        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: function(response){
                var tbodyEl = $('tbody');

                tbodyEl.html('');
                console.log(response.products);
                response.products.forEach(function(product){
                //for multi lines we need backslash after every lines to make the code look cleaner
                   
                tbodyEl.append('\
                    <tr>\
                        <td class="id">' + product.id + '</td>\
                        <td><input type= "text" class= "name" value=" ' + product.name + '">\
                    </td>\
                    <td>\
                        <button class="update-button">UPDATE/PUT</button>\
                        <button class="delete-button">DELETE</button>\
                    </td>\
                    </tr>\
                    ');
                });
            }
        });
    });

    //Create/Post
    $('#create-form').on('submit', function(event){
        event.preventDefault(); //prevents page from refershing when we submit the form

        //get the value in the variable
        var createInput = $('#create-input');
        $.ajax({
            url:'/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({name: createInput.val()}),
            success: function(response){
                console.log(response);
                createInput.val(''); //empty the value after use
                $('#get-button').click(); //we want the data to be updated automatically
            
            }
        });
    });

    //update/put
    $('table').on('click', '.update-button', function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();
        //console.log("script sending update" + newName); //works

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({newName: newName}),
            success: function(response){
                console.log(response);
                $('#get-button').click();
            }
        });
    });


    //delete
    $('table').on('click', '.delete-button', function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();
        //console.log("script sending update" + newName); //works

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({newName: newName}),
            success: function(response){
                console.log(response);
                $('#get-button').click();
            }
        });
    });

});