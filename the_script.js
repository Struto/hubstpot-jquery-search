$.extend($.expr[":"], {
	"containsNC": function (elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
});

var allBlogsHTML;
$.get('/blog/all', function(){}).done(function(data) {
  	allBlogsHTML = $(data).find('.st-blist-section');
});

var currentBlogSection = $('.st-blist-section')[0].outerHTML; 
var replacedHTML;

$('#gsc-i-id1').on('input', function(e){ 
	var searchString = $('#gsc-i-id1').val();
	if (searchString !== undefined && searchString.length > 2) { 
		if (replacedHTML === undefined) { 
			$('.st-blist-section').replaceWith(allBlogsHTML);
		 	replacedHTML = true;
		 }
		 $('.st-post-item-blist').addClass('hidden');
		 $('.st-post-item-blist:containsNC("'+searchString+'")').removeClass('hidden');

	} 

	if ((searchString === undefined || searchString.length <= 2) && replacedHTML !== undefined) { 
		$('.st-post-item-blist').removeClass('hidden');
		$('.st-blist-section').replaceWith(currentBlogSection);
		replacedHTML = undefined;
	}

	
});
