function calculateTotal(){
    var cTotal = parseInt($('#wstCost').val()) + parseInt($('#wbtCost').val()) + parseInt($('#irontCost').val()) + parseInt($('#drytCost').val());
    $('#totalAmount').val(cTotal);    
}
document.getElementById("mobileNumber").addEventListener("keyup",function(){
    $('#invDate').val(new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}));
    // $('#invDate').val(new Date().toISOString().slice(0,19));
})
document.getElementById("wsQty").addEventListener("keyup",function(){
    var amount = (document.getElementById("wspCost").value) * this.value;
    $('#wstCost').val(amount);
    calculateTotal();
})
document.getElementById("wspCost").addEventListener("keyup",function(){
    var amount = (document.getElementById("wsQty").value) * this.value;
    $('#wstCost').val(amount);
    calculateTotal();
})
document.getElementById("wbQty").addEventListener("keyup",function(){
    var amount = (document.getElementById("wbpCost").value) * this.value;
    $('#wbtCost').val(amount);
    calculateTotal();
})
document.getElementById("wbpCost").addEventListener("keyup",function(){
    var amount = (document.getElementById("wbQty").value) * this.value;
    $('#wbtCost').val(amount);
    calculateTotal();
})
document.getElementById("ironQty").addEventListener("keyup",function(){
    var amount = (document.getElementById("ironpCost").value) * this.value;
    $('#irontCost').val(amount);
    calculateTotal();
})
document.getElementById("ironpCost").addEventListener("keyup",function(){
    var amount = (document.getElementById("ironQty").value) * this.value;
    $('#irontCost').val(amount);
    calculateTotal();
})
document.getElementById("dryQty").addEventListener("keyup",function(){
    var amount = (document.getElementById("drypCost").value) * this.value;
    $('#drytCost').val(amount);
    calculateTotal();
})
document.getElementById("drypCost").addEventListener("keyup",function(){
    var amount = (document.getElementById("dryQty").value) * this.value;
    $('#drytCost').val(amount);
    calculateTotal();
})
