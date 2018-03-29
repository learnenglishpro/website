
/*==============================================================================
Returns true if the user is coming from a mobile device, false otherwise
===============================================================================*/
function isMobile() {
  if (navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 ) {
    return true;
  }

  return false;
}


function isCookieEnabled() {
  var cookieEnabled = navigator.cookieEnabled;

  if (!cookieEnabled) {
    document.cookie = "testcookie";
    cookieEnabled = document.cookie.indexOf("testcookie") != -1;
  }
  return cookieEnabled;
}



/*==============================================================================
Jump to the specified page
===============================================================================*/
function jumpToPage(viewName, queryParams, firstPage, lastPage) {
  var pageNumber = $('#jumppageinput').val();

  if (parseInt(pageNumber) != pageNumber) {
    alert('Please enter a valid page number between ' + firstPage + ' and ' + lastPage + '.');
    return false;
  }

  if (pageNumber < firstPage || pageNumber > lastPage) {
    alert('Please enter a valid page number between ' + firstPage + ' and ' + lastPage + '.');
    return false;
  }

  var href = ROOT_PATH + viewName + "?pagenum=" + (pageNumber - 1) + queryParams;

  location.href = href;
  return false;
}


/*==============================================================================
Validate a radio button list

radioButtonList: the radio button list object, ie. document.freetrialquery.freetrialsel in FreeTrialQuery.aspx
errorMessage: The error message to display in the Javascript alert box
===============================================================================*/
function validateRadio(radioButtonList, errorMessage) {
  var retval = false;
  for (var i = 0; i < radioButtonList.length; i++) {
    if (radioButtonList[i].checked) {
      retval = true;
    }
  }

  if (retval == false) {
    alert(errorMessage);
  }
  return retval;
}


/*==============================================================================
Open page with return href
===============================================================================*/
function openPageWithRetHref(href, isReturnHrefFirstParam) {
  var returnHref = window.location.href;

  if (isReturnHrefFirstParam == true) {
    // Open the Post New Thread page
    location.href = href + "?returnhref=" + encodeURIComponent(returnHref);
  }
  else {
    // Open the Post New Thread page
    location.href = href + "&returnhref=" + encodeURIComponent(returnHref);
  }

}

/*==============================================================================
Limit the text
===============================================================================*/
function textLimit(elementID, maxlen) {
  if (elementID.value.length > maxlen + 1) {
    alert('The maximum number of characters you are allowed to type in is ' + maxlen + ' characters.');
  }

  if (elementID.value.length > maxlen) {
    elementID.value = elementID.value.substring(0, maxlen);
  }
}

/*==============================================================================
submit for CreateNewPrivMsg
===============================================================================*/
function submitNewPrivMsg() {
  if ($("#CreateNewPrivMsg").valid()) {
    if (confirm('Are you sure you want to submit this message?') == true) {
      $('#CreateNewPrivMsg').submit();
    }
  }
}

/*==============================================================================
delete selected private messages
===============================================================================*/
function deletePrivMessages() {
  if( confirm( 'Are you sure you want to delete the selected messages?' ) == true )
  {
   $('#ViewPrivMsgList').submit();
  }
}


/*==============================================================================
validate the picture file
===============================================================================*/
function valPictureFile(inputID, maxSize) {

  //check whether browser fully supports all File API
  if (window.File && window.FileReader && window.FileList && window.Blob) {

    if ($('#' + inputID)[0].files[0] != null) {

      //get the file size and file type from file input field
      var fsize = $('#' + inputID)[0].files[0].size;

      if (fsize > maxSize) //do something if file size more than 1 mb (1048576)
      {
        alert("Your file is larger than " + maxSize + " bytes.  Please use a smaller file size");
        return false;
      }

      // check the file name
      var filePath = document.getElementById(inputID).value;
      var exts = ['.jpg', '.gif', '.png'];
      var valid = (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(filePath);

      if (valid == false) {
        alert("Your file is not a JPG, GIF, or PNG file.");
        return false;
      }
    }
  }

  return true;
}


/*==============================================================================
Extend the Jquery library to center an element with respect to the window location
===============================================================================*/
jQuery.fn.center = function () {
  this.css("position", "absolute");
  this.css("top", Math.max(0, (($(window).height() - this.outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
  this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
  return this;
}

/*==============================================================================
show the overlay centered
===============================================================================*/
function showOverlayCentered(divID) {
  //var divobj = $('#' + divID);
  if ($('#' + divID).css('display') == 'none') {
    $('#' + divID).center();
    $('#' + divID).show();
    $('#dimBackDiv').show();
  }
  else {
    $('#' + divID).css('display', 'none');
    $('#dimBackDiv').css('display', 'none');
  }
}


/*==============================================================================
show the overlay
divID: the div ID of the overlay
relElemID: the ID of the relative element we are display the overlay to
offsetRelElemLeft: left offset in pixels of the overlay to the relative element's left coordinate
offsetRelElemTop: top offset in pixels of the overlay to the relative element's top coordinate
useRelElemWidth: if we should use the width of the relative element for our offset
useRelElemHeight: if we should use the height of the relative element for our offset
===============================================================================*/
function showOverlay(divID, relElemID, offsetRelElemLeft, offsetRelElemTop, useRelElemWidth, useRelElemHeight, usePosition) {
  var divobj = $('#' + divID);
  if (divobj.css('display') == 'none') {
    var relElemObj = $('#' + relElemID);
    var relElemPos = relElemObj.offset();
    if (usePosition == true) {
      relElemPos = relElemObj.position();
    }
    var relElemWidth = 0;
    var relElemHeight = 0;

    if (useRelElemWidth == true) {
      relElemWidth = relElemObj.outerWidth();
    }

    if (useRelElemHeight == true) {
      relElemHeight = relElemObj.outerHeight();
    }


    divobj.css('left', relElemPos.left + relElemWidth + offsetRelElemLeft);
    // offset top by 17 pixels because we want the menu to appear under the share link
    divobj.css('top', relElemPos.top + relElemHeight + offsetRelElemTop);
    $('#' + divID).show();
  }
}


function closeOverlay(divID) {
  var divobj = $('#' + divID);
  divobj.css('display', 'none');
}


/*==============================================================================
is the value an integer
===============================================================================*/
function isInt(value) {

  return !isNaN(value) &&
         parseInt(Number(value)) == value &&
         !isNaN(parseInt(value, 10));
}


/*==============================================================================
show the hour and AM/PM portion of date
===============================================================================*/
function showStringAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}