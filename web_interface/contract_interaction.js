var app = angular.module('dApp', []);

app.controller('ratingsViewCntrl', function($scope) {
     
    $('#getRatings').off('click');
    $('#getRatings').on('click', function(e) {
        e.stopPropagation();
        $("#ratingsView").removeClass("hidden");
        let vendor_id = $('#viewRatingsVendorSelection').val();

        let audits = utility_obj.contract.getAllTheAuditIds(vendor_id, {
            from: utility_obj.fi_address
        });

        function ratings_obj() {
            this.fi;
            this.vendor;
            this.audit_category;
            this.rating;
            this.date;
        }

        let vendor_ratings = [];
        for (let i = 0; i < audits.length; i++) {
            if (audits[i].c[0] === 1) {
                let vr = new ratings_obj();
                let audit_rating = utility_obj.contract.accessAudit(i, {
                    from: utility_obj.fi_address
                });


                vr.fi = utility_obj.fi_accounts_mapping[audit_rating[0]];
                vr.vendor = utility_obj.vendor_accounts_mapping[audit_rating[1]];
                vr.rating = audit_rating[2].c[0];
                vr.audit_category = audit_rating[4];

                //https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
                vr.date = utility_obj.formatDate(new Date(audit_rating[3].c[0] * 1000));

                vendor_ratings.push(vr);
            }
        }

        $scope.vendorRatings = vendor_ratings;

    });
});

$(document).ready(function() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        console.log("connection....");
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log("connection....");
    }

    console.log("default account: ", web3.eth.accounts[0]);

    $.getJSON("../solidity-contracts/auditchain_contract_abi.json", function(data) {
        start_process(data);
        console.log("abi parsed successfully...");
    });

    var start_process = function(data) {
        utility_obj.accounts = web3.eth.accounts;
        // console.log(accounts)
        var auditchain_contract = web3.eth.contract(data);
        utility_obj.contract = auditchain_contract.at("0xb5148c9af3eff91978dafd4cce0b7507f37972b0");

        utility_obj.addFIaccountsToDropdown();
        utility_obj.addVendorAccountsToDropdown();
    }


    $("#submitAudit").off('click');
    $("#submitAudit").on('click', function(e) {
        e.stopPropagation();

        let vendor_id = $('#vendorSelection').val();
        let audit_category = $('#auditCategory').val();
        let vendor_rating = parseInt($('#vendorRating').val());

        utility_obj.contract.declareType("Financial Institution", {
            from: utility_obj.fi_address
        });

        // console.log("0xeda428f6e541a26e3ee0dfc862940cf2aceea278" === window.fi_address)

        var access_type = utility_obj.contract.accessType({
            from: utility_obj.fi_address
        });

        if (access_type) {
            console.log("access type defined...", access_type);
        } else {
            console.error("unable to deine access type...");
        }

        var contract_response = utility_obj.contract.createAudit(vendor_id, vendor_rating, audit_category, {
            from: utility_obj.fi_address,
            gas: 3000000
        });

        if (contract_response) {
            console.log("audit created...", window.fi_address);
        } else {
            console.error("unable to create contract...")
        }


        var count = utility_obj.contract.getAuditCount({
            from: utility_obj.fi_address
        });

        console.log("num of audits: ", count);
    });
});