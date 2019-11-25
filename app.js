$(document).ready(function() {
    var item
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q="
    var placeHldr = '<img src="https://via.placeholder.com/150">'
    var searchData;

    $("#search").click(function() {
        outputList.innerHTML = "";
        document.body.style.backgroundImage = "url('')";
        searchData = $("#search-box").val();

        if(searchData === "" || searchData === null) {
            displayError();
        }
        else {
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function(response) {
                    console.log(response)
                    if(response.totalItems === 0) {
                        alert("This title is not in our library!");
                    }
                    else {
                        $("title").animate({'margin-top': '5px'}, 1000);
                        $(".book-list").css("visibility", "visible");
                        displayResults(response);
                    }
                },
                error: function() {
                    alert("Something went wrong! <br>"+"Try again!");
                }
            });
        }
        $("#search-box").val("");
    });

    function displayResults(response) {
        for(var i = 0; i < response.items.length; i+=2) {
            item = response.items[i];
            title1 = item.volumeInfo.title;
            author1 = item.volumeInfo.authors;
            publisher1 = item.volumeInfo.publisher;
            description1 = item.volumeInfo.description;
            bookLink1 = item.volumeInfo.previewLink;
            bookIsbn1 = item.volumeInfo.industryIdentifiers[1].identifier
            bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

            item2 = response.items[i+1];
            title2 = item2.volumeInfo.title;
            author2 = item2.volumeInfo.authors;            
            publisher2 = item2.volumeInfo.publisher;
            description2= item2.volumeInfo.description;
            bookLink2 = item2.volumeInfo.previewLink;
            bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
            bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;

            outputList.innerHTML += '<div class="row mt-4">' +
                                    formatOutput(bookImg1, title1,  author1, publisher1, description1, bookLink1, bookIsbn1) +
                                    formatOutput(bookImg2, title2,  author2, publisher2, description2, bookLink2, bookIsbn2)
                                    '</div>';
 
            console.log(outputList);

        }
    }
    function formatOutput(bookImg, title, author, publisher, description, bookLink, bookIsbn) {
        var viewUrl = 'book.html?isbn='+bookIsbn;
        var htmlCard = `<div class="col-lg-6">
                            <div class="card" style="">
                                <div class="row no-gutters">
                                    <div class="col-md-4">
                                        <img src="${bookImg}" class="card-img" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body bg-dark">
                                            <h5 class="text-white card-title">${title}</h5>
                                            <p class="text-white card-text">Author: ${author}</p>
                                            <p class="text-white card-text">Publisher: ${publisher}</p>
                                            <p class="text-white card-text">Descrition: ${description}</p>
                                            <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
        return htmlCard;                                      
    }

    function displayError() {
        alert("You must enter a book title in the search query!");
    }
});