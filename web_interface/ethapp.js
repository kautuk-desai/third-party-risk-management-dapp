$(document).ready(function() {

    $(".user-type .dropdown-menu > a").click(function(e) {
        let new_value = $(".status").attr("data-display-text") + " " + this.innerHTML;
        $(".status").text(new_value);
        showActionPanel($(this).attr("data-value"));
    });

    var showActionPanel = function(user_type) {
        if (user_type === "create_audit") {
            hideWindow("vendorActionWindow");
            $("#fiCreateAudit").removeClass("hidden");
            $("#loginSelection").addClass("fi-selection-dd");
            utility_obj.addFIaccountsToDropdown();
        } else if (user_type === "view_audit") {
            hideWindow("fiCreateAudit");
            $("#vendorActionWindow").removeClass("hidden");
            modifyVendorActionView("fi");
            $("#loginSelection").addClass("fi-selection-dd");
            utility_obj.addFIaccountsToDropdown();
        } else {
            hideWindow("fiCreateAudit");
            $("#vendorActionWindow").removeClass("hidden");
            modifyVendorActionView("vendor");
        }

        if (utility_obj.fi_address === undefined) {
            $('#loginModal').modal('show');
        }
    };

    var modifyVendorActionView = function(user_type) {
        if (user_type === "vendor") {
            $("#vendorActionWindow .header-div h2").text("View Your Rating");
            $("#vendorActionWindow button").text("View My Rating");
            $("#vendorAccountID").attr("placeholder", "provide me your account address..");

            $('[for="loginSelection"]').text("Vendor")
            $("#loginSelection").addClass("vendor-selection-dd");
            utility_obj.addVendorAccountsToDropdown();
        } else {
            $("#vendorActionWindow .header-div h2").text("View Vendor Rating");
            $("#vendorActionWindow button").text("View Vendor Rating");
            $("#vendorAccountID").attr("placeholder", "provide vendor's account address..");

            $('[for="loginSelection"]').text("Financial Institute");
        }
    };

    var hideWindow = function(div_id) {
        if (!$("#" + div_id).hasClass("hidden")) {
            $("#" + div_id).addClass("hidden");
        }
    };

    $("#dappLogin").off("click");
    $("#dappLogin").on("click", function(e) {
        e.stopPropagation();
        utility_obj.fi_address = $('#loginSelection').val();
        $('#loginModal').modal('hide');
    });


});