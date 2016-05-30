var req;
var req2;
var currentCantico;
function reloadData()
{
   var now = new Date();
   url = 'LoadCantico.php';
   test = 'cantico.txt';
   changed = false;
  
   try {
      req = new XMLHttpRequest();
   } catch (e) {
      try {
         req = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
         try {
            req = new ActiveXObject("Microsoft.XMLHTTP");
         } catch (oc) {
            alert("No AJAX Support");
            return;
         }
      }
   }

   req.onreadystatechange = processReqChange;
   req.open("POST", test, true);
   req.send(null);
}

function processReqChange()
{
   // If req shows "complete"
   if (req.readyState == 4)
   {
      dataDiv = document.getElementById('currentData');

      // If "OK"
      if (req.status == 200)
      {
         // Set current data text
   //      dataDiv.innerHTML = 
		 if(currentCantico != req.responseText){ changed = true;
         // Start new timer (1 sec)
		   try {
				currentCantico = req.responseText;
				req2 = new XMLHttpRequest();
				req2.onreadystatechange = processCanticoChange;
				req2.open("POST", url+"?CANTICO="+currentCantico, true);
				req2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				req2.send();
				changed=false;
		   } catch (e) {
			  console.error(e.message);
		   }
		 }
         timeoutID = setTimeout('reloadData()', 1000);
      }
      else
      {
         // Flag error
         dataDiv.innerHTML = '<p>There was a problem retrieving data: ' + req.statusText + '</p>';
      }
   }
}
function processCanticoChange()
{
   // If req shows "complete"
   if (req2.readyState == 4)
   {
      dataDiv = document.getElementById('currentData');

      // If "OK"
      if (req2.status == 200)
      {
         // Set current data text
         dataDiv.innerHTML = req2.responseText;
      }
      else
      {
         // Flag error
         dataDiv.innerHTML = '<p>There was a problem retrieving data: ' + req2.statusText + '</p>';
      }
   }
}

