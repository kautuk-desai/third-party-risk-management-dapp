$(".user-type .dropdown-menu > a").click(function(e) {
  let new_value = $(".status").attr("data-display-text") + " " + this.innerHTML;
  $(".status").text(new_value);
  showActionPanel($(this).attr("data-value"));
});

var showActionPanel = function(user_type) {
  if (user_type === "create_audit") {
    hideWindow("vendorActionWindow");
    $("#fiCreateAudit").removeClass("hidden");
  } else if (user_type === "view_audit") {
    hideWindow("fiCreateAudit");
    $("#vendorActionWindow").removeClass("hidden");
    modifyVendorActionView("fi");
  } else {
    hideWindow("fiCreateAudit");
    $("#vendorActionWindow").removeClass("hidden");
    modifyVendorActionView("vendor");
  }
};

var modifyVendorActionView = function(user_type) {
  if (user_type === "vendor") {
    $("#vendorActionWindow .header-div h2").text("View Your Rating");
    $("#vendorActionWindow button").text("View My Rating");
    $("#vendorAccountID").attr("placeholder", "provide me your account address..");
  } else {
    $("#vendorActionWindow .header-div h2").text("View Vendor Rating");
    $("#vendorActionWindow button").text("View Vendor Rating");
    $("#vendorAccountID").attr("placeholder", "provide vendor's account address..");
  }
};

var hideWindow = function(div_id) {
  if (!$("#" + div_id).hasClass("hidden")) {
    $("#" + div_id).addClass("hidden");
  }
};

$("#getRatings").off('click');

$("#getRatings").on('click', function(e){
  e.stopPropagation();
  console.log("submit clikcet")
  $("#ratingsView").removeClass("hidden");
});