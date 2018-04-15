$(document).ready(function() {

    /*  the event is fired when the user defines the action he/she wants to perform
     * once the action is determined call the show action action panel based on the selection.
     */
    $(".user-type .dropdown-menu > a").click(function(e) {
        let new_value = $(".status").attr("data-display-text") + " " + this.innerHTML;
        $(".status").text(new_value);
        showActionPanel($(this).attr("data-value"));
    });


    /* this is the driver function when the user selects the specified type of action he/she
     * wants to perform with the application.
     * @params: user_type the type of user or precisely the action the user wants to perform
     */
    var showActionPanel = function(user_type) {
        $("#loginSelection").html("");
        //$("#ratingsView tbody").html("");
        $("#ratingsView")
        if (user_type === "create_audit") {
            hideWindow("vendorActionWindow");
            $("#fiCreateAudit").removeClass("hidden");
            $("#loginSelection").removeClass("vendor-selection-dd");
            $("#loginSelection").addClass("fi-selection-dd");
            utility_obj.addFIaccountsToDropdown();
        } else if (user_type === "view_audit") {
            hideWindow("fiCreateAudit");
            $("#vendorActionWindow").removeClass("hidden");
            modifyVendorActionView("fi");
            $("#loginSelection").removeClass("vendor-selection-dd");
            $("#loginSelection").addClass("fi-selection-dd");
            utility_obj.addFIaccountsToDropdown();
        } else {
            hideWindow("fiCreateAudit");
            $("#vendorActionWindow").removeClass("hidden");
            utility_obj.fi_address = undefined;
            modifyVendorActionView("vendor");
        }

        if (utility_obj.fi_address === undefined) {
            $('#loginModal').modal('show');
        }
    };


    /* this function willl select the dependent view of the user type
     * if the user is a vendor then modify the view and display the get ratings
     * view. else display the get ratings view for the financial institute representative. 
     * @params: user_type: the user type accessing the retrieve audit view (vendor of FI representataive)
     */
    var modifyVendorActionView = function(user_type) {
        if (user_type === "vendor") {
            $("#vendorActionWindow .header-div h2").text("View Your Rating");
            $("#vendorActionWindow button").text("View My Rating");
            $("#vendorAccountID").attr("placeholder", "provide me your account address..");

            $('[for="loginSelection"]').text("Vendor");
            $("#loginSelection").removeClass("fi-selection-dd");
            $("#loginSelection").addClass("vendor-selection-dd");
            utility_obj.addVendorAccountsToDropdown();
        } else {
            $("#vendorActionWindow .header-div h2").text("View Vendor Rating");
            $("#vendorActionWindow button").text("View Vendor Rating");
            $("#vendorAccountID").attr("placeholder", "provide vendor's account address..");

            $('[for="loginSelection"]').text("Financial Institute");
        }
    };


    /*
     * this function hides the window based of the div id provided.
     * used to modify the view based on the user type (vendor, fi representative)
     * @params: div_id : the element to be hidden.
     */
    var hideWindow = function(div_id) {
        if (!$("#" + div_id).hasClass("hidden")) {
            $("#" + div_id).addClass("hidden");
        }
    };


    /* this click listener handles the login action.
     * the moment the FI or Vendor is selection it saves as application wide object of
     * the account address.
     */
    $("#dappLogin").off("click");
    $("#dappLogin").on("click", function(e) {
        e.stopPropagation();
        utility_obj.fi_address = $('#loginSelection').val();
        $('#loginModal').modal('hide');
    });
});