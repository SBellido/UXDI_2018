$(document).ready(function () {
    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn');
            allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
/*
    allNextBtn.click(function(){
        var currentTab = 1, // Current tab is set to be the first tab (0)
            curStep = $('#step-'+currentTab),
            curStepBtn = curStep.attr("id"),
            nextStep = $($(this).attr("href")),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='email']"),
            isValid = true;
        console.log(curStep);
        curStep.hide();
        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });
*/

    // Step form

    var currentTab = 0;// Current tab is set to be the first tab (1)
    function showTab(n) {
      // This function will display the specified tab of the form ...
      var x = document.getElementsByClassName("setup-content");
      $(x[n]).show();
      fixStepIndicator(n)
    }

  function nextPrev(n) {

    // This function will figure out which tab to display
    var x = document.getElementsByClassName("setup-content");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    $(x[currentTab]).hide();

    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    //var nextStepWizard = $('div.setup-panel div a[href="#step-' +currentTab+ '"]').parent().next().children("a");

    //nextStepWizard.trigger('click');
    console.log(x[currentTab]);
    // if you have reached the end of the form... :
    if (currentTab >= x.length-1) {
      $(x[currentTab]).show();
      fixStepIndicator(currentTab)
      //...the form gets submitted:
      // Add submit action
      // Google event
      gtag('event', 'sendForm', {
        'event_category': 'Formularios',
        'event_action': 'Send',
        'event_label': $(x[currentTab]).parents('form').attr('id')
      })

    // end Google event
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }

  function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("setup-content");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        $(y[i]).next('.error-msg').hide();
        // add an "invalid" class to the field:
        $(y[i]).addClass('invalid');
        $(y[i]).after('<div class="error-msg">Este campo es requerido</div>');
        // and set the current valid status to false:
        valid = false;
      }
    }
    return valid; // return the valid status
  }
  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = $('div.setup-panel div a');
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" btn-primary", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " btn-primary";
  }
  allNextBtn.click(function(){
    nextPrev(1);
  });
  allPrevBtn.click(function(){
    nextPrev(-1);
  })
    $('div.setup-panel div a.btn-primary').trigger('click');
});
