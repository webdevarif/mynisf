(function ($) {
    const THEME = {
      init() {
        this.scrollbar();
        this.setupUlSelect();
        this.setupTAB();
        this.setupDropdown();
        this.setupThemeSLIDER();
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
      },

      setupThemeSLIDER(){
        if($('[theme-slider]').length){
          $('[theme-slider]').slick({
            prevArrow:'<button type="button" class="arrows-left"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg></button>',
            nextArrow:'<button type="button" class="arrows-right"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg></button>'
          });
        }
      }


    };
  
    $(document).ready(function () {
      THEME.init();    
    });
  
  })(jQuery);







