alert('1');
$$(document).on('pageInit',function(e){ 
 var page =e.detail.page;
 alert(page.name);
 var hotelType =page.query.hotelType;
 
 if(page.name=='searchbox'){ 
	var hotelType =page.query.hotelType;
	
	//=== Set default date ===/
	var strDate =new Date();
	var enrDate =new Date();
    strDate.setDate(strDate.getDate() + 1);
	enrDate.setDate(enrDate.getDate() + 3);
	
	var startDate = (strDate.getMonth()+1) + "/" + strDate.getDate() + "/" +strDate.getFullYear();
	var enDate = (enrDate.getMonth()+1) + "/" + enrDate.getDate() + "/" +enrDate.getFullYear();
	var startRange =strDate.getFullYear()+', '+(strDate.getMonth()+1)+', '+strDate.getDate();
	var endRange =enrDate.getFullYear()+', '+(enrDate.getMonth()+1)+', '+enrDate.getDate();
	

	$$('#startDate').val(startDate);
	$$('#endDate').val(enDate);
  /*===== Calendar =====*/
    var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
    var today =new Date();
	var calendarRange = myApp.calendar({
    input: '#appCalendar',
    dateFormat: 'M dd yyyy',
    rangePicker: true,
	minDate: today,
	//value: [new Date(2018, 5, 11), new Date(2018, 5, 15)],
	value: [new Date(startRange), new Date(endRange)],
	onChange: function (p, values, displayValues){  
		var start =values[0];
		var end =values[1];
		
		var sMonth =start.getMonth() < 12 ? start.getMonth() + 1 : 1;
		var eMonth =end.getMonth() < 12 ? start.getMonth() + 1 : 1;
		
		var startDate = sMonth+'/'+start.getDate()+'/'+start.getFullYear(); 
		var endDate =eMonth+'/'+end.getDate()+'/'+end.getFullYear();
		var startDate_txt = weekday[start.getDay()]+', '+start.getDate()+' '+monthNames[start.getMonth()]+' '+start.getFullYear().toString().substr(-2);
		var endDate_txt = weekday[end.getDay()]+', '+end.getDate()+' '+monthNames[end.getMonth()]+' '+end.getFullYear().toString().substr(-2);
		
		$$('#startDate').val(startDate);
		$$('#endDate').val(endDate);
		$$('#startDate_txt').html(startDate_txt);
		$$('#endDate_txt').html(endDate_txt);
		
	   }
    });

   
   var glob =0;
   $$('.addMoreRooms').on('click', function () {
	  var numRooms = $$('.roomListcls').length;
	  var n =parseInt(numRooms)+1;
	  $$('#number_of_rooms').val(n);
	  glob++;
	  var pacHtml='';
      pacHtml+='<div class="card ks-facebook-card roomListcls">'+
	            '<input type="hidden" name="adults[]" id="adults_'+glob+'" value="1"><input type="hidden" name="childs[]" id="childs_'+glob+'" value="0">'+
			'<div class="card-footer no-border"><a href="#" class="link rooming">Room '+n+'</a><a href="#" class="link deleteRooms" ><i class="material-icons">delete</i></a></div>'+
				'<div class="card-content">'+
				 '<div class="content-block">'+ 
					'<div class="roomPagePadding">'+ 
						'<div class="row margin_br">'+
							'<div class="col-60">'+ 
								'<div class="roomPageTitle">Adults</div>'+
								'<div class="roomPageTitleBottom">Above 12 yrs</div>'+
							'</div>'+
							'<div class="col-40">'+
								'<div class="row roomPagePaddingBottom">'+
									'<div class="col-33">'+
										'<a href="#" class="link left pack_circle minusAdults" rel="'+glob+'"><i class="material-icons">remove</i></a>'+
									'</div>'+
									'<div class="col-33">'+
										'<a href="#" class="link center" id="countAdults_'+glob+'">1</a>'+ 
									'</div>'+
									'<div class="col-33">'+
										'<a href="#" class="link right pack_circle plusAduls" rel="'+glob+'"><i class="material-icons">add</i></a>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="roomPagePadding">'+
						'<div class="row">'+
							'<div class="col-60 marginbr"> '+
								'<div class="roomPageTitle">Children</div>'+
								'<div class="roomPageTitleBottom">0-12 yrs</div>'+
							'</div>'+
							'<div class="col-40">'+
								'<div class="row roomPagePaddingBottom">'+
									'<div class="col-33">'+
										'<a href="#" class="link left pack_circle minusChilds" rel="'+glob+'"><i class="material-icons">remove</i></a>'+
									'</div>'+
									'<div class="col-33">'+
										'<a href="#" class="link center" id="countChilds_'+glob+'">0</a>'+
									'</div>'+
									'<div class="col-33">'+
										'<a href="#" class="link right pack_circle plusChilds" rel="'+glob+'"><i class="material-icons">add</i></a>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="row"><div class="col-30">&nbsp;</div><div class="col-70 childAgeCls" id="childAgeList_'+glob+'"></div></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';	 
	 $$('#roomspacksDetails').append(pacHtml);
	 
	 if(n==3){ $$('.addMoreRooms').hide();}
	 else{$$('.addMoreRooms').show();}
	  
	 deleteRooms();
	 roomAndGuestCount();
	});
  
  function deleteRooms(){
	$$('.deleteRooms').on('click',function(e){
	  e.preventDefault();
	  $$(this).closest('.roomListcls').remove();
	  var numRooms = $$('.roomListcls').length;
	  $$('#number_of_rooms').val(numRooms);
	  $$('.addMoreRooms').show();
	  
	  var v=1;
	  $$(".rooming").each(function() {
		  $$(this).html('Room '+v);
		  v++;
	   });
    })  
  }
  
  
  $$("body").on("click", ".plusAduls", function(e){
	 e.preventDefault(); 
     var rel = $$(this).attr('rel');
	 var adt =$$('#countAdults_'+rel).html();
	 var adult= parseInt(adt)+1;
	 if(adult<=4){
	  $$('#countAdults_'+rel).html(adult);
	  $$('#adults_'+rel).val(adult);
	  roomAndGuestCount();
	 }
  });
  $$("body").on('click','.minusAdults',function(e){
	e.preventDefault();	
	var rel = $$(this).attr('rel');
	var adt =$$('#countAdults_'+rel).html();
	var adult= parseInt(adt)-1;
	if(adult>=1){
	 $$('#countAdults_'+rel).html(adult);
	 $$('#adults_'+rel).val(adult);
	 roomAndGuestCount();
	}
  });
  
  $$("body").on('click','.plusChilds',function(e){
	e.preventDefault();	
	var rel = $$(this).attr('rel');
	var adt =$$('#countChilds_'+rel).html();
	var child= parseInt(adt)+1;
	if(child<=3){
	$$('#countChilds_'+rel).html(child);
	$$('#childs_'+rel).val(child);
	 manageChildAge(child,rel);
	 roomAndGuestCount();
	}
  });
  
  $$("body").on('click','.minusChilds',function(e){
	e.preventDefault();	
	var rel = $$(this).attr('rel');
	var adt =$$('#countChilds_'+rel).html();
	var child= parseInt(adt)-1;
	if(child>=0){
	$$('#countChilds_'+rel).html(child);
	$$('#childs_'+rel).val(child);
	manageChildAge(child,rel);
	roomAndGuestCount();
	}
  });
  
  function manageChildAge(child,rel){
	 var ageHtml ='';
	 for(var i=0;i<child;i++){
	   ageHtml+='<select name="childAge['+rel+'][]" relKey='+rel+'><option value="0"> < 1 </option><option value="1"> 1 </option><option value="2"> 2 </option></select>';	 
	 }
	 $$("#childAgeList_"+rel).html(ageHtml);
  }
  
  function roomAndGuestCount(){
	var adts  = document.getElementsByName('adults[]');
	var chds  = document.getElementsByName('childs[]');
	var guest=0;
    for (var i = 0; i <adts.length; i++) {
	  var adt=adts[i].value;
	  guest =parseInt(guest)+parseInt(adt);
	}
	
	for (var c = 0; c <chds.length; c++) {
	  var chd=chds[c].value;
	  guest =parseInt(guest)+parseInt(chd);
	}
	
	var rooms =$$('#number_of_rooms').val();
   	$$('#roomGuestTxt').html(rooms+' Rooms, '+guest+' Guests ');
	$$('#selectedDest_adults').html(guest+' Guests, '+rooms+' Rooms');
  }
  
  
  /*=== Auto suggetion ===*/
  var autocompleteDropdownAjax = myApp.autocomplete({
	opener: $$('#autocomplete-standalone-popup'),
    openIn: 'popup',
	backOnSelect: true,
    preloader: true, 
    valueProperty: 'fullname', 
    textProperty: 'fullname', 
    limit: 20, 
	autoFocus: true,
    dropdownPlaceholderText: 'Try "JavaScript"',
    expandInput: true, 
    source: function (autocomplete, query, render) {
        var results = [];
        if (query.length === 0) {
            render(results);
            return;
        }
        autocomplete.showPreloader();
        $$.ajax({
            url: 'https://yasen.hotellook.com/autocomplete',
            method: 'GET',
            dataType: 'json',
            data: {
                term: query,
				action: "Location_Fetch",
				lang: 'en',
				limit: 5
            },
            success: function (data) {
				var myData =data.cities; 
                for (var i = 0; i < myData.length; i++) {
                   if (myData[i].fullname.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(myData[i]);
                }
                autocomplete.hidePreloader();
                render(results);
            }
        });
    },
	onChange: function (autocomplete, value) { 
	 var dataObj =value[0];
	 $$('#destination').val(dataObj.latinFullName);	
     $$('#selectedDest').html(dataObj.latinFullName);	 	 
     $$('#latitude').val(dataObj.location.lat);
     $$('#longitude').val(dataObj.location.lon);
	 $$('#region_id').val(dataObj.id);
	}
	
   });

  
  
  
  
   var hotelObject = [];
  
   $$('.findHotelResults').on('click', function(e){ 
	   var formData = myApp.formToData('#searchHotel_frm');
	   //myApp.formStoreData('HotelRequestData',formData);
	 var adults =$$('#adults_0').val(); 
	 var childs =$$('#childs_0').val();
	 var childAgeArr= new Array;
	 $$('.childAgeCls select').each(function(){ 
		   var relKey =$$(this).attr('relKey');
		   childAgeArr.push([relKey, $$(this).val()]); 
		});
	 
	 
	  var startDate =$$('#startDate').val();
      var startDateArr =startDate.split('/');
      var endDate =$$('#endDate').val();
      var endDateArr =endDate.split('/');
	  
	  var m =startDateArr[0];
	  var d =startDateArr[1];
	  if(d<10){d ='0'+d; }
	  if(m<10){m ='0'+m; }
	  
	  var rm =endDateArr[0];
	  var rd =endDateArr[1];
	  if(rd<10){rd ='0'+rd; }
	  if(rm<10){rm ='0'+rm; }
	  
      //var checkIn =startDateArr[2]+'-'+startDateArr[0]+'-'+startDateArr[1];
	  //var checkOut =endDateArr[2]+'-'+endDateArr[0]+'-'+endDateArr[1];
	  
	  var checkIn =startDateArr[2]+'-'+m+'-'+d;
	  var checkOut =endDateArr[2]+'-'+rm+'-'+rd;
	
	  var url ='module/adivaha-hotel-booking/results.html?mid=ADIM5C437514F0303&mt=result&destination='+$$('#destination').val()+'&latitude='+$$('#latitude').val()+'&longitude='+$$('#longitude').val()+'&checkIn='+checkIn+'&checkOut='+checkOut+'&Cri_currency=USD&Cri_language=en_US&hotelType=1&rooms='+$$('#number_of_rooms').val()+'&adults=1&childs=&childAge=';
	
	  mainView.router.loadPage(url);
	 
   })
 
 }
 
 if(page.name=='results'){
	 
   var destination =page.query.destination;
   var latitude =page.query.latitude;	 
   var longitude =page.query.longitude;	 
   var checkIn =page.query.checkIn;
   var checkOut =page.query.checkOut;
   var Cri_currency =page.query.Cri_currency;
   var Cri_language =page.query.Cri_language;
   var checkOut =page.query.checkOut;
   var rooms =page.query.rooms;
   var adults = page.query.adults;
   var childs = page.query.childs;
   var childAge = page.query.childAge;
   alert(rooms+' '+adults);
   if( (destination!='') && (latitude!='') && (longitude!=''))
   {
	 myApp.showIndicator();  
	 
	 var param ={action:'findSearchKey',pid:pid,regionid:latitude+'ZZZZZ'+longitude, checkIn:checkIn,checkOut:checkOut, rooms:rooms,adults:adults,childs:childs,childAge:childAge};
	 
	 $$.get(RequestURL+'/ean_update_rates.php',param, function (response,status) {
		 var myData =JSON.parse(response);
		 var search_Session_Id =myData.search_session;
		 var exist =myData.exist;
		 $$('#search_Session_Id').val(search_Session_Id);
		 if(exist=='Yes'){
			Searched_Hotels(); 
		 }
		 else{
			Upldate_Rates(); 
		 }
		  myApp.hideIndicator();
	  });

     function Upldate_Rates(){ 
	     var search_Session_Id = $$('#search_Session_Id').val();
		 var param ={action:'Upldate_Rates',pid:pid,search_Session_Id:search_Session_Id,regionid:latitude+'ZZZZZ'+longitude, checkIn:checkIn,checkOut:checkOut, rooms:rooms,adults:adults,childs:childs,childAge:childAge};
		 $$.get(RequestURL+'/ean_update_rates.php',param, function (response,status) {
			 myApp.hideIndicator(); 
			 if(status==200){
			   var myData =JSON.parse(response);
			   myApp.formStoreData('HotelLists',myData.responseData.HotelLists.HotelList);
			   var getHotelLists = myApp.formGetData('HotelLists'); 
			  
			   listHotelResults(getHotelLists);
			   //setTimeout(function(){Upldate_Rates_All()},500);
			 } 
		 });
	 }
    
    function Upldate_Rates_All(){
		var search_Session_Id = $$('#search_Session_Id').val();
	    var param ={actionType:'Upldate_Rates_All',pid:pid,search_Session_Id:search_Session_Id,regionid:latitude+'ZZZZZ'+longitude, checkIn:checkIn,checkOut:checkOut, rooms:rooms,adults:adults,childs:childs,childAge:childAge};
		 $$.get(RequestURL+'/ean_update_rates.php',param, function (response,status) {
		 if(status==200){
		   	 $$('#totalrecords').val(response);
			 $$('#counthotel').html(response);
		 } 
	    });
     }
	
    function Searched_Hotels(){
	  var search_Session_Id = $$('#search_Session_Id').val();
      var sortField =$$('#sortField').val(sortField);
      var sortby = $$('#sortby').val(sortby);  	  
	  
	   var param ={actionType:'Searched_Hotels',search_Session_Id:search_Session_Id,lat:latitude,lon:longitude, checkIn:checkIn,checkOut:checkOut, rooms:rooms,adults:adults,childs:childs,childAge:childAge,page:1,orderby_fild:sortField,orderby_val:sortby};
	   $$.get(RequestURL+'/update_rates.php',param, function (response,status) {
		 if(status==200){
		   var myData =JSON.parse(response);
		   var totalrecords =myData.totalrecords;
		   var getHotelLists=myData.result;
		    $$('#totalrecords').val(totalrecords);
			$$('#counthotel').html(totalrecords);
		   listHotelResults(getHotelLists,0);	  
		 } 
	    });
	} 	
	 
	 
   }
   
   $$('.sortingHotels').on('click', function (e) {
	 var getHotelLists = myApp.formGetData('HotelLists');  
     var sortField = $$(this).attr('sortField');
	 var rel = $$(this).attr('rel');
	 if(rel==0){
	   var sortby ='ASC';	 
	   $$(this).attr('rel',1);
	 }
	 else{
	   var sortby ='DESC';	 
	   $$(this).attr('rel',0);	 
	 }
	 if(sortField!=''){
	   $$('#sortField').val(sortField);
       $$('#sortby').val(sortby);	   
	   Searched_Hotels();
	 }
   });
   
   
   function listHotelResults(getHotelLists,page){
     if(getHotelLists.length>0){
		 var html=''; 
		for (var i = 0; i < getHotelLists.length; i++) {
		 html+='<li><div class="card">'+
			   '<div class="card-content">'+
			      '<div class="list-block media-list">'+
				    '<div>'+
					'<a href="detailsPage.html?destination='+destination+'&hotel_id='+getHotelLists[i].hotelId+'&latitude='+latitude+'&longitude='+longitude+'&checkIn='+checkIn+'&checkOut='+checkOut+'&Cri_currency='+Cri_currency+'&Cri_language='+Cri_language+'&rooms='+rooms+'&adults='+adults+'&childs='+childs+'&childAge='+childAge+'" >'+
					'<div class="item-content">'+
					 '<div class="item-media ResultsPagehover">'+
						'<div class="ResultsPageMaxWidth" style="background: url('+ getHotelLists[i].thumbnail +') no-repeat center;">'+
								'<i class="material-icons Resultsfavorite">favorite</i>'+
							'</div>'+
						    '</div>'+
						  '<div class="item-inner">'+
							'<div class="item-title-row">'+
							 '<div class="item-title ResultsTetelHotel">' + getHotelLists[i].Name +'</div>'+
							'</div>'+
							'<div class="item-subtitle ResultsTetelHotell">' + getHotelLists[i].Address1 +'</div>'+
							'<div class="item-subtitle ResultsTetelstar_rate"><i class="material-icons"></i>' + getHotelLists[i].StarRating +'</div>'+
							'<div class="item-subtitle ResultsTetelReviews">'+
								'<div><img src="'+getHotelLists[i].tripAdvisorRatingUrl+'"></div> <div class="sre4pde40">'+getHotelLists[i].tripAdvisorRating+'</div> '+getHotelLists[i].tripAdvisorReviewCount+' Reviews</div>'+
						 '</div>'+
						  '<div class="item-innerPrices">'+
							  '<div class="itemTitel12">$' + getHotelLists[i].HighRate +'</div>'+
							  '<div class="itemTitel24price">$' + getHotelLists[i].LowRate +'</div>'+
							 '<div class="itemTitel2Night">for 2 Nights</div>'+
							 '<div class="itemTitel6room">6rooms left</div>'+
						  '</div>'+
						'</div>'+
						'</a>'+
					'</div>'+
					'</div>'+
				 '</div>'+
					'<div class="card-footer CardFooterMateriall">'+
					 '<a href="#" class=""><i class="material-icons">check</i>Free Cancellation</a>'+
					 '<a href="#" class=""><i class="material-icons">check</i>Free Wi-Fi</a>'+
					 '<a href="#" class=""><i class="material-icons material-iconsclear">clear</i>Free breakfast</a>'+
					'</div>'+
					 '<div class="card-footer CardFooterMaterial">'+
					 '<a href="#" class="FooterMaterialDeal">DEAL</a>'+
					  '<a href="#" class="FootFlatOff">'+getHotelLists[i].promoDescription+'</a>'+
					  '<a href="#" class="fooAddMore">+1More</a>'+
					'</div>'+
				'</div></li>';	
		}
		if(page>1){
		 $$('#hotelResults ul').append(html);	
		}
		else{
	     $$('#hotelResults ul').html(html);
		}		 
	 } 	 
   }
    
   
   
   var loading = false;
   var lastLoadedIndex =  $$('.list-block li').length;
   var page =2;
   $$('.infinite-scroll').on('infinite', function () {
      // Exit, if loading in progress
        if (loading) return;
        // Set loading trigger
        loading = true;
		var search_Session_Id = $$('#search_Session_Id').val();
		var totalrecords =$$('#totalrecords').val();
		var no_of_pages =Math.ceil(totalrecords/15);
		alert(no_of_pages+'=>'+page);
		if(no_of_pages>page){
		var param ={actionType:'Searched_Hotels',search_Session_Id:search_Session_Id,lat:latitude,lon:longitude, checkIn:checkIn,checkOut:checkOut, rooms:rooms,adults:adults,childs:childs,childAge:childAge,page:page};
        $$.get(RequestURL+'/update_rates.php', param, function (data) {
            loading = false;
            if (data === '') {
                // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                myApp.detachInfiniteScroll($$('.infinite-scroll'));
            }
            else {
                // Append loaded elements to list block
                //$$('#hotelResults').append(data);
				var myData =JSON.parse(data);
		        var getHotelLists=myData.result;
				listHotelResults(getHotelLists,page);
                // Update last loaded index
                lastLoadedIndex = $$('.list-block li').length;
				page++;
            }
        });
	  }else{
		myApp.detachInfiniteScroll($$('.infinite-scroll'));  
	  }
   });
   
 }
 

});
