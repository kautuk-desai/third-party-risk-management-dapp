function Utilities() {
    this.accounts = [];
    this.fi_accounts_mapping = {};
    this.fis = ["JPMorgan Chase & Co.", "Bank of America Corp.", "Wells Fargo & Co.", "Citigroup Inc.", "M&T Bank"];
    this.vendor_accounts_mapping = {};
    this.vendors = ["Equifax", "TransUnion", "Experian PLC", "FICO", "Credit Karma"];
    this.fi_address = undefined;
    this.contract;
}


var test = 1;

Utilities.prototype.addFIaccountsToDropdown = function() {
    let $vendor_selection = $(".fi-selection-dd");
    let $self = this;
    for (let i = 0; i < 5; i++) {
        $self.fi_accounts_mapping[$self.accounts[i]] = $self.fis[i];
        let select_option_html = '<option value="';
        select_option_html += $self.accounts[i];
        select_option_html += '">';
        select_option_html += $self.fis[i];
        select_option_html += '</option>';
        $vendor_selection.append(select_option_html);
    }
}

Utilities.prototype.addVendorAccountsToDropdown = function() {
    let $self = this;
    let $vendor_selection = $(".vendor-selection-dd");
    for (let i = 5; i < 10; i++) {
        $self.vendor_accounts_mapping[$self.accounts[i]] = $self.vendors[i - 5];
        let select_option_html = '<option value="';
        select_option_html += $self.accounts[i];
        select_option_html += '">';
        select_option_html += $self.vendors[i - 5];
        select_option_html += '</option>';
        $vendor_selection.append(select_option_html);
    }
}

Utilities.prototype.isLoggedIn = function() {
    if (utility_obj.fi_address) {
        return true;
    } else {
        alert(" Please Log In...");
        return false;

    }
}

Utilities.prototype.formatDate = function(date) {
    let month_names = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    let day = date.getDate();
    let month_index = date.getMonth();
    let year = date.getFullYear();

    let full_date = day + "-" + month_names[month_index] + "-" + year;

    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return full_date + " " + time;
}

var utility_obj = new Utilities();