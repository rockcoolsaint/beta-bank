var Show = (function(){
  var $btnNewTransaction;
  var $btnSave;
  var $inputAmount;
  var $modalTransaction;
  var $selectTransactionType;
  var $parameters;
  var $notification;

  var bankAccountId;
  var url = "/api/v1/bank_accounts/new_transaction";

  var fetchElements = function() {
    $btnNewTransaction      = $("#btn-new-transaction");
    $btnSave                = $("#btn-save");
    $inputAmount            = $("#input-amount");
    $modalTransaction       = $("#modal-transaction");
    $selectTransactionType  = $("#select-transaction-type");
    $parameters             = $("#parameters");
    $notification           = $(".notification");

    bankAccountId           = $parameters.data("bank-account-id");
  };

  var disableControls = function() {
    $btnSave.prop("disabled", true);
    $inputAmount.prop("disabled", true);
    $selectTransactionType.prop("disabled", true);
  }

  var enableControls = function() {
    $btnSave.prop("disabled", false);
    $inputAmount.prop("disabled", false);
    $selectTransactionType.prop("disabled", false);
  }

  var initializeEvents = function() {
    $btnNewTransaction.on("click", function() {
      $modalTransaction.modal('show');
    });

    $btnSave.on("click", function() {
      var amount = $inputAmount.val();
      var transactionType = $selectTransactionType.val();
      disableControls();

      $notification.html("");

      $.ajax({
        url: url,
        method: 'POST',
        datatype: 'json',
        data: {
          amount: amount,
          transaction_type: transactionType,
          bank_account_id: bankAccountId
        },
        success: function(response) {
          window.location.href = "/bank_accounts/" + bankAccountId
        },
        error: function(response) {
          $notification.html(JSON.parse(response.responseText).errors.join());
          enableControls();
        }
      });
    });
  };
  
  var init = function() {
    fetchElements();
    initializeEvents();
  };

  return {
    init: init
  };
})();