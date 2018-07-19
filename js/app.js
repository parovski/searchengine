var app = {

    apiurl: "https://www.googleapis.com/customsearch/v1?cx=005607402202424640494%3Amaaxcfvzzgw&key=AIzaSyDQEEkJBYrkR3cAaffYUPj9GG8NybueUJ0&num=10",

    request: function(type, q, st) {
        var r = new XMLHttpRequest();
        r.open(type, this.apiurl + st + '&q=' + q.value, true);
        r.onreadystatechange = function() {
            if (r.readyState != 4 || r.status != 200) return;
            var data = JSON.parse(r.responseText);
            var output = '';
            var pagination = '';
            for (var i = 0; i < data.items.length; i++) {
                if (st == '&searchType=image') {
                    output += '<a href="' + data.items[i].link + '" target="_blank"><img src="' + data.items[i].image.thumbnailLink + '" class="result-image"></a>';
                } else {
                    output += '<div class="result-item page'+(Math.floor(i/4)+1)+'"><h3>' + data.items[i].title + '</h3><a href="' + data.items[i].formattedUrl + '" target="_blank">' + data.items[i].displayLink + '</a><p>' + data.items[i].htmlSnippet + '</p></div>';
                    if(i%4==0) 
                        pagination+='<a href="#" class="plink plink'+(Math.floor(i/4)+1)+'" onclick="goToPage('+(Math.floor(i/4)+1)+');return false;">'+(Math.floor(i/4)+1)+'</a> &nbsp; ';
                }
            }
            if (st == '&searchType=image') {
                document.querySelector('.googleImages2').innerHTML = output;
            } else {
                document.querySelector('.googleLinks2').innerHTML = output;
                 document.querySelector('.pagination').innerHTML = pagination;
            goToPage(1);
            }
            
        };
        r.send();
    },

    search: function() {
        var containers = document.querySelectorAll('.googleImages2, .googleLinks2');
        for (var i = 0; i < containers.length; i++) {
            containers[i].innerHTML = '';
        }
        this.request('GET', document.querySelector('#q'), '');
        this.request('GET', document.querySelector('#q'), '&searchType=image');
    }
};

var search = document.querySelector('#search');
search.addEventListener('submit', function(e) {
    e.preventDefault();
    app.search();
});

function goToPage(page)
{
     document.querySelectorAll('.result-item').forEach(function(userItem) {
        userItem.style.display='none';
    });
     document.querySelectorAll('.plink').forEach(function(userItem) {
        userItem.style.textDecoration='none';
    });
      document.querySelector('.plink'+page).style.textDecoration='underline';
 document.querySelectorAll('.page'+page).forEach(function(userItem) {
    userItem.style.display='block';
});
         
}
