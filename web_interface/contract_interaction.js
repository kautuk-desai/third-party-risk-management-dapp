$(document).ready(function() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        console.log("connection....");
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log("connection....");
    }

    web3.eth.defaultAccount = web3.eth.accounts[0];

    $.getJSON("contract_abi.json", function(data) {
    	start_process(data);
    	console.log(data);
    });

    var start_process = function(abi) {
        var CoursetroContract = web3.eth.contract(abi);
        console.log(coursetro);
        var coursetro = CoursetroContract.at("0x468aba744e052f3a95262ae7cd3b05290a69edf2");
        coursetro.setInstructor('Brutis', 44);
        console.log(coursetro.getInstructor());
    }
});