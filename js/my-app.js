// Initialize your app
var myApp = new Framework7({
    modalTitle: 'hybrid',
    // If it is webapp, we can enable hash navigation:
    pushState: true,
    material: true,
	animatePages:true,
	
    cache: false,
	panel: {
		swipe: 'left',
	},
	
	routes: [
    {
	  name: 'search-car',	
      path: 'search-car',
      url: 'search-car.html',
    },
	{
	  path: '/',
	  url: 'index.html',
    },
	{
      path: '(.*)',
      url: './pages/404.html',
    },
  ],
	
    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    },

});

// Export selectors engine
var $$ = Dom7;
// Add view
var mainView = myApp.addView('.view-main', {
   domCache: true,
});



var RequestURL ='https://www.abengines.com/wp-content/plugins/adivaha/apps/modules/adivaha-hotel-booking';
var TPHotelUrl ='https://flight-images.viagencia.com/hotels';
var TPFlightUrl ='https://apptravelpayouts.viagencia.com/flights';
var pid ='77A211';
var marker='40247';


var ModuleList ={'ADIM5C66A1BF561B1':'adivaha-fly-smart',
                 'ADIM5C437514F0303':'adivaha-hotel-booking'
                };

myApp.onPageInit('index', function (page) {
$$('.pageFlashLoaderKK').show();	

setTimeout(function(){ $$('.pageFlashLoaderKK').hide('slow'); }, 3000);	

var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];	

var strDate =new Date();	
var enrDate =new Date();
strDate.setDate(strDate.getDate() + 1);
enrDate.setDate(enrDate.getDate() + 2);


//var sMonth =start.getMonth() < 12 ? start.getMonth() + 1 : 1;
//var eMonth =end.getMonth() < 12 ? start.getMonth() + 1 : 1;

var checkIn = strDate.getFullYear()+"-"+ (strDate.getMonth()+1) + "-" + strDate.getDate();
var checkOut = enrDate.getFullYear()+"-"+ (enrDate.getMonth()+1) + "-" + enrDate.getDate();


var startDate_txt = weekday[strDate.getDay()]+', '+strDate.getDate()+' '+monthNames[(strDate.getMonth()+1)]+' '+strDate.getFullYear().toString().substr(-2);
var endDate_txt = weekday[enrDate.getDay()]+', '+enrDate.getDate()+' '+monthNames[(enrDate.getMonth()+1)]+' '+enrDate.getFullYear().toString().substr(-2);


var htmlHotel ='<div class="history-home-page-main-left"><i class="fa fa-home"></i></div><a href="'+TPHotelUrl+'?marker='+marker+'&destination=New Delhi&checkIn='+checkIn+'&checkOut='+checkOut+'&adults=2&children=&language=en&currency=USD&&cityId=24077" class="link external"><div class="history-home-page-main-right"><div class="history-home-text">New Delhi</div><div class="history-home-text1">'+startDate_txt+' - '+endDate_txt+'</div><div class="history-home-text2"><i class="fa fa-user"></i> 2 Guests </div><div class="history-home-text3"><i class="fa fa-bed"></i>1 Room </div></a></div>';
$$('#storeHotelLists').html(htmlHotel);

var htmlFlight ='<div class="history-home-page-main-left">'+
					'<i class="fa fa-plane"></i>'+
				'</div>'+
				'<div class="history-home-page-main-right">'+
				  '<div class="history-recents">'+
						'<div class="history-recents-left">'+
						 '<a href="'+TPFlightUrl+'?marker='+marker+'&origin_name=Delhi,%20India&origin_iata=DEL&destination_name=Goa,%20India&destination_iata=GOI&depart_date='+checkIn+'&return_date=&Flights_Return_direct=enable&with_request=true&adults=1&children=0&infants=0&trip_class=0&currency=USD&locale=en&one_way=true&ct_guests=1passenger&ct_rooms=1" class="link external"><div class="deltopatfri">'+
							'<div class="deltopatfri1">'+
								'<span>DEL</span> <span><i class="fa fa-arrow-right"></i></span> <span>GOI</span>'+
								'</div>'+
									'<div class="deltopatfri2">'+
								'<span>'+startDate_txt+'</span>'+
							'</div>'+
							'</div></a>'+
							'<a href="'+TPFlightUrl+'?marker='+marker+'&origin_name=Delhi,%20India&origin_iata=DEL&destination_name=Mumbai,%20India&destination_iata=BOM&depart_date='+checkIn+'&return_date=&Flights_Return_direct=enable&with_request=true&adults=1&children=0&infants=0&trip_class=0&currency=USD&locale=en&one_way=true&ct_guests=1passenger&ct_rooms=1" class="link external"><div class="deltopatfri">'+
							'<div class="deltopatfri1">'+
								'<span>DEL</span> <span><i class="fa fa-arrow-right"></i></span> <span>BOM</span>'+
								'</div>'+
									'<div class="deltopatfri2">'+
								'<span>'+startDate_txt+'</span>'+
							'</div>'+
							'</div></a>'+
					'</div>'+
					'</div>'+
				'<div class="history-home-text2"><i class="fa fa-briefcase"></i>  Economy<span class="economyadlet">1 <i class="fa fa-male"></i> </span> </div>'+
			   '</div>';
$$('#storeFlightLists').html(htmlFlight);

}).trigger();

document.writeln("<script type='text/javascript' src='module/adivaha-hotel-booking/js/search-directory.js'></script>");