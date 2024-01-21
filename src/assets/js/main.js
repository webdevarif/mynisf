(function ($) {
    const THEME = {
      init() {
        this.scrollbar();
        this.setupUlSelect();
        this.setupTAB();
        this.setupDropdown();
        this.setupThemeSLIDER();
        this.setupDateCalender();
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
      },
      
      setupDateCalender: function () {
        const $container = $("[calendar]");
        const $daysContainer = $container.find(".calender-body");
        const $monthYear = $container.find("[monthYear]");
        const $dateInput = $(".datepicker--id");
        // const calendar = $("#calendar");
  
        let currentDate = new Date();
        let selectedDate = null;
  
        // Set the value of datepicker input to the current date
        $dateInput.val(currentDate.toDateString());
  
        function handleDayClick(day) {
          selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          renderCalendar();
          $dateInput.val(selectedDate.toDateString());
          HatchProElementor.updateTimepicker(); // Call updateTimepicker when the day is clicked
        }
  
        function createDayElement(day) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const today = new Date(); // Current date
  
          // Add custom disabled dates (replace these with your actual disabled dates)
          const customDisabledDates = [
            new Date("2024-01-26"), 
            new Date("2024-01-29"), 
            new Date("2022-01-30")
          ];

          const dayClass = date.toDateString() === today.toDateString() ? "current" : "";
          const selectedClass = selectedDate && date.toDateString() === selectedDate.toDateString() ? "selected" : "";
          // const disabledClass = date < today.setDate(today.getDate() - 1) ? "disabled" : "";
          const disabledClass = date < today.setDate(today.getDate() - 1) || customDisabledDates.some(d => date.toDateString() === d.toDateString()) ? "disabled" : "";

          const dayElement = $("<td>", {
            class: `day ${dayClass} ${selectedClass} ${disabledClass}`,
            text: day,
          });
  
          dayElement.on("click", () => handleDayClick(day));
          return dayElement;
        }
  
        function renderCalendar() {
          $daysContainer.empty();
          const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
          $monthYear.text(`${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`);
  
          const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  
          // Create thead and append day names
          const table = $("<table class='calender-picker-table'>");
          const thead = $("<thead>");
          const dayNamesRow = $("<tr>");
          dayNames.forEach((dayName) => {
            const dayNameElement = $("<th>", {
              class: "day-name",
              text: dayName,
            });
            dayNamesRow.append(dayNameElement);
          });
          thead.append(dayNamesRow);
          table.append(thead);
          $daysContainer.append(table);
  
          // Create tbody and append days
          const tbody = $("<tbody>");
          for (let week = 1; week <= 6; week++) {
            const weekRow = $("<tr>");
            for (let day = 1; day <= 7; day++) {
              const dayNumber = (week - 1) * 7 + day - firstDay.getDay();
              if (dayNumber >= 1 && dayNumber <= lastDay.getDate()) {
                weekRow.append(createDayElement(dayNumber));
              } else {
                weekRow.append($("<td>")); // Empty cell for days outside the month
              }
            }
            tbody.append(weekRow);
          }
          table.append(tbody);
        }
  
        renderCalendar();
  
        $("#prevBtn, #nextBtn").on("click", function () {
          currentDate.setMonth(currentDate.getMonth() + ($(this).is("#nextBtn") ? 1 : -1));
          renderCalendar();
        });
      },

    };
  
    $(document).ready(function () {
      THEME.init();    
    });
  
  })(jQuery);







