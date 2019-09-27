		var products = new Array();
		products.push(product);
		var pBought = new Array();
		var pidBought = new Array();

		
		var billCount=0;
		function loadProduct() {
			var inputPID = document.getElementById("pId").value;
			if(billCount>4){
				if(!pidBought.includes(parseInt(inputPID))){
					console.log("Maxiumn limit :: "+pidBought.toString());
					alert("Maxiumn limit reached!");
					return;
				}
			}
			var selectedProduct;
			for (var i = products[0].length - 1; i >= 0; i--) {
				if(inputPID==products[0][i].pId){
					console.log(products[0][i]);
					selectedProduct = products[0][i];
					break;
				}
				else{
					selectedProduct ="";
				}
			}
			if(isNaN(selectedProduct.pId)){
				alert("Invalid Product");
				return;
			}
			console.log("Selected product :"+selectedProduct.pId);
			
			if(checkExist(selectedProduct.pId)){
				return;
			}

			//populate input 
			var divRef = document.getElementById("invoice");

			var para = document.createElement("input");
			para.setAttribute("id", "dPID"+selectedProduct.pId);
			para.setAttribute("value", selectedProduct.pId);
			para.setAttribute("disabled", "disabled");
			divRef.appendChild(para);

			para = document.createElement("input");
			para.setAttribute("id", "dPName"+selectedProduct.pId);
			para.setAttribute("value", selectedProduct.pName);
			para.setAttribute("disabled", "disabled");
			divRef.appendChild(para);

			para = document.createElement("input");
			para.setAttribute("id", "dPCost"+selectedProduct.pId);
			para.setAttribute("value", selectedProduct.pCost);
			para.setAttribute("disabled", "disabled");
			divRef.appendChild(para);

			para = document.createElement("input");
			para.setAttribute("id", "ipDPQuant"+selectedProduct.pId);
			para.setAttribute("type", "number");
			para.setAttribute("placeholder", "Quantity");
			para.setAttribute("value", 1);
			para.setAttribute("onfocus", "this.value=''");
			para.setAttribute("onBlur", "calculate("+selectedProduct.pId+","+selectedProduct.pCost+")");
			divRef.appendChild(para);
			calculate(selectedProduct.pId, selectedProduct.pCost);

			billCount++;
			console.log("Bill count "+billCount);
			console.log("Bill id "+pBought.toString());
		}

		function calculate(spId, spCost) {

			var quant = document.getElementById("ipDPQuant"+spId).value;
			if(quant<0){
				alert("Quantity cannot be negative");
				return;
			}
	  		var element = document.getElementById("dPLineCost"+spId);
	  		console.log(element);
    		if(element!=null){
    			var prevLineValue = document.getElementById("dPLineCost"+spId).value;
    			document.getElementById("dPLineCost"+spId).value = quant*spCost;
    			var prevTotal = document.getElementById("Total").innerHTML;
				console.log("Bill: "+prevTotal);
				prevTotal = parseInt(prevTotal)-prevLineValue;
				document.getElementById("Total").innerHTML = parseInt(prevTotal) + (quant*spCost);
    			return;
    		}

			console.log(spId+" : cost : "+spCost);
			
			var divRef = document.getElementById("invoice");
			para = document.createElement("input");
			para.setAttribute("id", "dPLineCost"+spId);
			para.setAttribute("value", spCost*quant);
			para.setAttribute("disabled", "disabled");
			divRef.appendChild(para);

			var prevTotal = document.getElementById("Total").innerHTML;
			console.log("Bill: "+prevTotal);
			document.getElementById("Total").innerHTML = parseInt(prevTotal) + (quant*spCost);
			pidBought.push(spId);
			
		}

		//checking for eixisting product in invoice 
		function checkExist(spId) {
			var element = document.getElementById("dPLineCost"+spId);
	  		console.log(element);
    		if(element!=null){
    			alert("PID already exist update existing record!");
    			var prevQuant = document.getElementById("ipDPQuant"+spId).value;
    			document.getElementById("ipDPQuant"+spId).value = parseInt(prevQuant)+1;
    			var spCost = document.getElementById("dPCost"+spId).value;
    			console.log("cost :"+spCost);
    			calculate(spId, spCost);
    			return true;
    		}
			
		}

		//write invoice in new window 
		function print() {
			var today = new Date();
			console.log(pidBought.toString());
			pBought.push("<table id='Receipt' align='center'><tr><th>Product Name</th><th>Unit Price</th><th>Quantity</th><th>Line Total</th></tr>"); 
			for (var i = 0; i<=pidBought.length - 1; i++) {
				pBought.push("<tr><td>"+document.getElementById('dPName'+pidBought[i]).value+"</td><td>"+
								document.getElementById('dPCost'+pidBought[i]).value+"</td><td>"+
								document.getElementById('ipDPQuant'+pidBought[i]).value+"</td><td>"+
								document.getElementById("dPLineCost"+pidBought[i]).value+"</td></tr>");
			}
			pBought.push("</table>");
			var totalBill = document.getElementById("Total").innerHTML;
			pBought.push("<br><hr><br><h4 id='total' align='right'>Bill total :"+"<text>&#8377</text>"+totalBill+"</h4>");
			pBought.push("<h4 id='total' align='right'>Tax(5%) :"+"<text>&#8377</text>"+Math.round(parseInt(totalBill)*0.05)+"</h4>");
			pBought.push("<h4 id='total' align='right'>Total amount to be paid :"+"<text>&#8377</text>"+Math.round(parseInt(totalBill)*1.05)+"</h4>");
			noToWord(Math.round(parseInt(totalBill)*1.05));
			pBought.push("<h4 id='total' align='right'>Total(In Words)      :"+words+"</h4>");
			var billwin = window.open("", "Receipt", "width=1000,height=800,screenX=100, screenY=100");
			billwin.document.write('<html><head><title>Receipt!</title><link rel="stylesheet" type="text/css" href="style.css"></head><body>');
			billwin.document.write('<div id="header"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJyReJASfPGZgEJ8G30wzAzwOUm_XfSmSyhEBWe0Y3Pt7zzKDtuA" id="logo"></a><h2 id="logoBill">Acme Grocers</h2></div>');
			billwin.document.write("<div id='billno'><h5 align='left'>Bill ID: "+Math.round(Math.random()*1000)+"</h5><h5> Date: "+
 				today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
				+"</h5><br><br><hr style='border-top: dashed 2px;'><br><h4 align='center'>Invoice</h4><br><br><br></div>"+pBought.join(""));
			billwin.document.write('</body></html>');
			pBought =[];
		}	