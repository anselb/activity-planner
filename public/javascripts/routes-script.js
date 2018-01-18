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

  $('.activity-delete').submit(function(e){
    e.preventDefault();
    var activityId = $(this).children('.activity-id').text();
    var itineraryId = $(this).children('.itinerary-id').text();
    var thisForm = $(this);
    //'/itineraries/:itinId/activities/:actId/delete'
    //(href="/itineraries/#{itinerary.id}/activities/#{activity.id}/delete"
    $.ajax({
      url: '/itineraries/'+itineraryId + '/activities/' + activityId+'/delete',
      type: 'GET'
    }).done(function(data){
        thisForm.closest('.media').remove();
      })
    });

    $('.itinerary-delete').submit(function(e){
      e.preventDefault();
      var itineraryId = $(this).children('.itinerary-id').text();
      var thisForm = $(this);
      console.log("Testing Delete");
      //'/itineraries/:itinId/activities/:actId/delete'
      //(href="/itineraries/#{itinerary.id}/delete"
      $.ajax({
        url: '/itineraries/'+itineraryId + '/delete',
        type: 'GET'
      }).done(function(data){
          thisForm.closest('.itinerary-list-container').remove();
        })
      });
});
