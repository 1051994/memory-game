 function dd(obj, string = 'your target', mode = 'l'){ 
		switch (mode) {
			case 'l':
				var out = "";
				for(var i in obj){
					out += i + " : " + obj[i] + "\n";
				}
				alert(string + " : " + out);
				// statements_1
				break;
			case 'c':
			console.log(string);
			console.log(obj);
				// statements_def
				break;
		}
 }
                function  sweetalert (titleToBind,bodyToBind,typeToBind){
  
swal({
  title: titleToBind,
  text: bodyToBind,
  type: typeToBind,
  showCancelButton: true,
  confirmButtonText:"play again",
  cancelButtonText: 'No, stay!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    swal( 'Reloading!',
      
      'have Fun',
      'success'
    )
  } else if (
    // Read more about handling dismissals
    result.dismiss === swal.DismissReason.cancel
  ) {
    swal(
      'pause',
      'Refresh the page if you want to play again)',
      'error'
    )
  }
})