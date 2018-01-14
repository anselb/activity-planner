$(document).ready(function(){

  $('.activity-add').click(function(){
      let mediaDiv = $(this).parent('.media-body').parent('.media')

      let name = mediaDiv.children('.media-body').children('a').children('.media-heading').text()
      let imageUrl = mediaDiv.children('.media-left').children('a').children('img').attr('src')
      let activityUrl = mediaDiv.children('.media-left').children('a').attr('href')
      let location = mediaDiv.children('.media-body').children('.address').text()

    let itinId = new RegExp('itineraries\/(.+)\/activities').exec(window.location.href);
    // $.post('/itineraries/' + parseInt(itinId[1]) + '/activities', { name, imageUrl, activityUrl, location }, function(){
    // });
    $.ajax({ url: '/itineraries/' + parseInt(itinId[1]) + '/activities',
             type: 'POST',
             dataType: "json",
             data: { name, imageUrl, activityUrl, location },
             success: function(response){
                        window.location.href = response.redirect;
                      }
            });
  });

  $('.activity-delete').click(function(e){
    e.preventDefault();
    var thisButton = $(this);
    //'/itineraries/:itinId/activities/:actId/delete'
    //(href="/itineraries/#{itinerary.id}/activities/#{activity.id}/delete"
    $.ajax({
      url: thisButton.attr('href'),
      type: 'GET'
      }).done(function(){
        thisButton.closest('.media-body').remove();
      })
    });
});
