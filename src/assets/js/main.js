(function ($) {
    const THEME = {
      init() {
        this.scrollbar();
        this.setupUlSelect();
        this.setupTAB();
        this.setupDropdown();
      },
  
      scrollbar() {  
        Scrollbar.initAll();
      },
  
      setupUlSelect() {
        $('.ul-select-input').on('click', function () {
          const $menu = $(this).closest('.ul-select');
  
          const onMouseUp = (e) => {
            if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
              $menu.removeClass('is-active').find('.ul-select-list').slideUp(100);
            }
          };
  
          $menu.toggleClass('is-active')
            .find('.ul-select-list')
            .slideDown(100)
            .promise()
            .done(() => {
              if ($menu.hasClass('is-active')) {
                $(document).on('mouseup', onMouseUp);
              } else {
                $(document).off('mouseup', onMouseUp);
              }
            });
        });
  
        // CHOOSE INPUT SELECT
        $('.ul-select-list li[data-value]').on('click', function (event) {
          event.preventDefault();
          const $that = $(this);
          const $menu = $that.closest('.ul-select');
          const $name = $menu.find('.ul-select-name');
          const $input = $menu.find('.input-hidden-field');
  
          $menu.removeClass('is-active')
            .find('.ul-select-list')
            .slideUp(100, () => {
              $name.html($that.html());
              $input.val($that.data('value'));
              $menu.removeClass('no-selected').addClass('selected');
            });
        });
  
        // CHOOSE INPUT SELECT
        $('.select-arrow-cancel').on('click', function (event) {
          event.preventDefault();
          const $that = $(this);
          const $menu = $that.closest('.ul-select');
          const $name = $menu.find('.ul-select-name');
          const $input = $menu.find('.input-hidden-field');
  
          $menu.removeClass('is-active')
            .find('.ul-select-list')
            .slideUp(200, () => {
              $input.val('');
              $name.html('');
              $menu.addClass('no-selected').removeClass('selected');
            });
        });
      },

      setupTAB(){
        $(document).ready(function() {
          // Handle tab clicks
          $('.tab-link').on('click', function(e) {
              e.preventDefault();

              // Hide all tab content
              $('.tab-panel').removeClass('active');

              // Show the selected tab content
              var targetTab = $(this).attr('href');
              $('.tab-panel' + targetTab ).addClass('active');

              // Update the active class on the tab navigation
              $('.tab-link').parent().removeClass('active');
              $(this).parent().addClass('active');
          });
        });
      },

      setupDropdown(){
        $(document).ready(function() {
          $('.dropdown-toggler').on('click', function () {
            const $overlay = $('.body-overlay');
            const $dropdownWrapper = $(this).closest('.dropdown-wrapper');

            const onMouseUp = (e) => {
              if (!$dropdownWrapper.is(e.target) && $dropdownWrapper.has(e.target).length === 0) {
                $overlay.removeClass('show');
                $dropdownWrapper.find('.dropdown-menu').slideUp(300).removeClass('active');
              }
            };
            
            $overlay.addClass('show')
            $dropdownWrapper
              .find('.dropdown-menu')
              .slideDown(300)
              .addClass('active')
              .promise()
              .done(() => {
                if ($dropdownWrapper.find('.dropdown-menu').hasClass('active')) {
                  $(document).on('mouseup', onMouseUp);
                } else {
                  $(document).off('mouseup', onMouseUp);
                }
              });
          });
        });
      }


    };
  
    $(document).ready(function () {
      THEME.init();    
    });
  
  })(jQuery);







