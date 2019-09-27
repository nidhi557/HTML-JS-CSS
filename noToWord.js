
			var units = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
			var tens = ['ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninty'];
			var unique = ['eleven', 'twelve', 'thirteen', 'forteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'ninteen'];
			var scale =['', '', 'hundred', 'thousand'];
			var words ="";
		function noToWord(n) {
			
			if(n<20){
				unitsToWord(n, "");
			}
			else if(n>=20 && n<100){
				tensToWord(n, "");
			}
			else if(n<1000){
				hundredToWord(n, "");
			}
			else if(n<10000){
				thousandToWords(n, "");
			}
			else if(n<100000){
				tenThousandToWords(n, "");
			}
			else{
				words = ("Out of bound!");
			}

		}
		function unitsToWord(n, prefix) {
			if(n==0){
				words = prefix+' ';
			}
			else if(n<10){
				words = (prefix+' '+units[n-1]);
			}
			
		}
		function tensToWord(n, prefix) {
				if(n>10 && n<20){
					words = (prefix+' '+unique[Math.floor(n%10)-1]);
				}
				else if(n<10){
					unitsToWord(n, prefix);
				}
				else{
					last = n%10;
					n = Math.floor(n/10);
					console.log(last+"  - "+n);
					prefix+=" "+tens[n-1]+" ";
					unitsToWord(last, prefix);
				}
					
				
		}
		function hundredToWord(n, prefix){
				first = Math.floor(n/100);
				if(first==0)
					prefix +=' ';
				else
					prefix +=' '+ units[first-1]+' '+scale[2];
				tensToWord(n%100, prefix);
		}
		function thousandToWords(n, prefix){
				first = Math.floor(n/1000);
				if(first==0)
					prefix +=' ';
				else
					prefix += ' '+units[first-1]+' '+scale[3];
				hundredToWord(n%1000, prefix);
		}
		function tenThousandToWords(n, prefix){
				first = Math.floor(n/1000);
				if(first>10 && first<20){
					prefix +=' '+unique[Math.floor(first%10)-1];
				}
				else{
					last = first%10;
					first = Math.floor(first/10);
					console.log(last+"  - "+first);
					if(first==0)
						prefix +='';
					else
						prefix+=" "+tens[first-1]+" ";
					if(last==0){
						prefix +=' ';
					}
					else if(last<10){
						prefix +=' '+units[last-1];
					}
				}

				hundredToWord(n%1000, prefix+' '+scale[3]);
		}
