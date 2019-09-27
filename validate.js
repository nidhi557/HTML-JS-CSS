	//load user from xml 
		var myParser;
		var myXMLDoc;
			if(window.DOMParser){
				myParser = new DOMParser();
				myXMLDoc = myParser.parseFromString(xmlUsers, "text/xml");
				console.log("XML loaded");
				
			}
		var msg;
		function validate(){
			var ipUsername = document.getElementById('username').value;	
			var ipPassword = document.getElementById('password').value;

			var errmsg = document.getElementById("errmsg");
			if(errmsg!=null)
				errmsg.remove();
			if(ipUsername==""){
				msg = document.createTextNode("Username cannot be blank");
				showMsg();
				return;
			}
			if(ipPassword==""){
				msg = document.createTextNode("Password cannot be blank");
				showMsg();
				return;
			}
		
			var users = myXMLDoc.getElementsByTagName("user"); 
			console.log("users loaded : "+users.length);
			console.log(users);
			var index=-1;
			for (var i = users.length - 1; i >= 0; i--) {
				if(users[i].childNodes[0].firstChild.nodeValue==ipUsername && users[i].childNodes[0].firstChild.nodeValue==ipPassword){
					msg = "Login successful";
					window.location.href = "dataentry.html";	
					break;
				}else{
					document.getElementById('username').value = "";
					document.getElementById('password').value = "";
					msg = document.createTextNode("Incorrect credentials");		
				}
			}
			
			//btn.addEventListener("click", showMsg);
			showMsg();
			//bodyRef.removeChild(para);

		}
		function showMsg() {
			var para = document.createElement("p");
			para.appendChild(msg);
			console.log(para);
			var bodyRef = document.getElementById("msg");
			para.setAttribute("align", "center");
			para.setAttribute("id","errmsg");
			para.style.backgroundColor = "#aabbcc";
			bodyRef.appendChild(para);

		}