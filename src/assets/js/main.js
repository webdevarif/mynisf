(function ($) {
    const THEME = {
      init() {
        this.setupUlSelect();
        this.setupSlideRange();
        this.setupMobileCode();
        this.setupTAB();
        this.setupDropdown();
        this.setupThemeSLIDER();
        this.setupDateCalender();
        this.setupMenuDrawer();
        this.setupRating();
        this.setupVideoPlayer();
        this.setupSelect2();
      },

      setupMobileCode() {
        // -----Country Code Selection
        if ($('[mobile-code-select]').length) {
          $('[mobile-code-select]').each(function () {
            $(this).intlTelInput({
              initialCountry: "in",
              separateDialCode: true,
            });
          });
        }
      },

      setupSlideRange() {
      },
      
      setupUlSelect() {
        $('.ul-select-input').on('mousedown', function (e) {
          const $menu = $(this).closest('.ul-select');
      
          const onMouseUp = (event) => {
              // Check if the click is outside the dropdown menu
              if (!$menu.is(event.target) && $menu.has(event.target).length === 0 && $menu.hasClass('is-active')) {
                  $menu.removeClass('is-active').find('.ul-select-list').slideUp(0);
                  // Remove the event listener after hiding the dropdown
                  $(document).off('mouseup', onMouseUp);
              }
          };
      
          // Toggle the 'is-active' class to show/hide the dropdown
          $menu.toggleClass('is-active')
              .find('.ul-select-list')
              .slideToggle(0, function () {
                  // Add or remove the event listener based on the dropdown visibility
                  if ($menu.hasClass('is-active')) {
                      $(document).on('mouseup', onMouseUp);
                  } else {
                      $(document).off('mouseup', onMouseUp);
                  }
              });
      
          // Prevents double-click from selecting text in the input
          e.preventDefault();
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
            .slideUp(0, () => {
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
            .slideUp(0, () => {
              $input.val('');
              $name.html('');
              $menu.addClass('no-selected').removeClass('selected');
            });
        });
      },

      setupTAB() {
        $(document).ready(function () {
          // Get the value after the hash from the current URL
          const hashValue = window.location.hash;
      
          if (hashValue) {
            // Hide all tab content
            $('.tab-panel').removeClass('active');
      
            // Show the selected tab content
            $('.tab-panel' + hashValue).addClass('active');
      
            // Update the active class on the tab navigation
            $('.tab-link').parent().removeClass('active');
            $(`.tab-link[href="${hashValue}"]`).parent().addClass('active');
          }
      
          // Handle tab clicks
          $('.tab-link').on('click', function (e) {
            e.preventDefault();
      
            // Get the target tab from the href attribute
            const targetTab = $(this).attr('href');
      
            // Hide all tab content
            $('.tab-panel').removeClass('active');
      
            // Show the selected tab content
            $(targetTab).addClass('active');
      
            // Update the active class on the tab navigation
            $('.tab-link').parent().removeClass('active');
            $(this).parent().addClass('active');
      
            // Update the URL hash
            window.location.hash = targetTab;
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
      
      setupDateCalender() {
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

      setupMenuDrawer() {              
      let body = $('.nisf-body');
      let trigger = $('.menu-toggler');

      trigger.on("click", function (e) {
          e.preventDefault();
          body.toggleClass('is-drawer-open');
          // Stop further propagation to prevent immediate closing
          e.stopPropagation();
      });

      // Close menu drawer when clicking outside of it
      $(document).on("click", function (e) {
          if (body.hasClass('is-drawer-open') && !$(e.target).closest('.nisf-menu-drawer').length && !$(e.target).is('.menu-toggler')) {
              body.removeClass('is-drawer-open');
          }
      });

      $(".has-submenu .menu-item-link").on("click", function (e) {
          e.preventDefault();
          let submenuWrapper = $(this).siblings("ul.submenu");

          if (submenuWrapper.length) {
              submenuWrapper.slideToggle();
          }
      });
    },

    setupRating(){

      const $form = $('.rating-form');
      const $inputRatings = $form.find('input[name="rating"]');
      const $submitBtn = $form.find('button[type="submit"]');
      const $progressList = $form.find('.list-stars-progress li');

      $inputRatings.on('change', function () {
          $submitBtn.prop('disabled', !$inputRatings.is(':checked'));
          updateProgress();
      });
      function updateProgress() {
          const selectedStars = $form.find('input[name="rating"]:checked').val();
          $progressList.removeClass('active current');
          $progressList.slice(0, selectedStars).addClass('active');
          $progressList.eq(selectedStars - 1).addClass('current');
      }
    },
    

      setupVideoPlayer(){
        let videoWrappers = document.querySelectorAll(".video-wrapper");
    
        videoWrappers.forEach(wrapper => {
          let video = wrapper.querySelector('.video-element');
          let button__play = wrapper.querySelector('.video-control--play button.play');
          let button__pause = wrapper.querySelector('.video-control--play button.pause');

          button__play.addEventListener("click", function() {    
                // For example, if you want to play/pause a video inside the wrapper:
                // let video = wrapper.querySelector("video");
                if (video) {
                    if (video.paused) {
                        video.play();
                    } else {
                      video.pause();
                    }
                }
            });

          button__pause.addEventListener("click", function() {    
              // For example, if you want to play/pause a video inside the wrapper:
              // let video = wrapper.querySelector("video");
              if (video) {
                  if (video.paused) {
                      video.play();
                  } else {
                    video.pause();
                  }
              }
          });
        });        
      },
      setupSelect2(){
        // Initialize Select2 with custom settings
        if ($('[multi-select]').length) {
          $('[multi-select]').each(function () {
            var $placeholder = $(this).data('placeholder'); // Use "var" to declare the variable
            $(this).select2({
              multiple: true,
              placeholder: $placeholder,
            });
          });
        }
      }

    };
  
    $(document).ready(function () {
      THEME.init();    
    });
  
  })(jQuery);

// LENIS SETUP
  
  window.addEventListener("DOMContentLoaded", (event) => {
    //ScrollTrigger.config({ ignoreMobileResize: true });
    "use strict"; // fix lenis in safari
    const lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 0.7,
        infinite: false,
        gestureOrientation: "vertical",
        normalizeWheel: false,
        smoothTouch: false,
        syncTouchLerp: 1,
        touchMultiplier: 0.1,
        autoResize: true
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      function connectToScrollTrigger() {
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time)=>{
          lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)
      }
      // Uncomment this if using GSAP ScrollTrigger
      connectToScrollTrigger();
  });

// SLIDER RANGE
  const onInput = (parent, e) => {
    const slides = parent.querySelectorAll('input');
    const min = parseFloat(slides[0].min);
    const max = parseFloat(slides[0].max);
  
    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);
  
    const percentageMin = (slide1 / (max - min)) * 100;
    const percentageMax = (slide2 / (max - min)) * 100;
  
    parent.style.setProperty('--range-slider-value-low', percentageMin);
    parent.style.setProperty('--range-slider-value-high', percentageMax);
  
    if (slide1 > slide2) {
      const tmp = slide2;
      slide2 = slide1;
      slide1 = tmp;
  
      if (e?.currentTarget === slides[0]) {
        slides[0].insertAdjacentElement('beforebegin', slides[1]);
      } else {
        slides[1].insertAdjacentElement('afterend', slides[0]);
      }
    }
    
    parent.querySelector('.range-slider__display').setAttribute('data-low', slide1);
    parent.querySelector('.range-slider__display').setAttribute('data-high', slide2);
  }
  
  addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.range-slider')
      .forEach(range => range.querySelectorAll('input')
        .forEach((input) => {
        if (input.type === 'range') {
          input.oninput = (e) => onInput(range, e);
          onInput(range);
        }
      }))
  });