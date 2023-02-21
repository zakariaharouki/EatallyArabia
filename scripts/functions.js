var iti = null;


function inViewHandler() {
  $(".image-holder").on("inview", function (event, isInView) {
    if (isInView) {
      $(this).addClass("inView");
    }
  });
}

function initFunctions() {
  AOS.init();
  var input = document.querySelector("#phone");
  iti = window.intlTelInput(input, {
    separateDialCode: true,
    initialCountry: "ae"
  });
}

function responsiveMenuSetup() {
  if ($(window).width() < 768) {
    $(".menu ").wrap('<div class="responsive-menu"></div>');

    $("header").append(
      "<div class=burger-menu> <div> </div> <div> </div> <div> </div></div>"
    );
    $(".menu-holder-responsive").append("<div class=close-menu-icon> </div>");
  }
}

// function to toggle the active state of the bruger menu
function responsiveMenuStateHandler() {
  $(".burger-menu").click(function () {
    $(".responsive-menu").fadeToggle();
    $(this).toggleClass("active");
  });
  $(".menu li a").click(function () {
    $(".responsive-menu").fadeToggle();
    $(".burger-menu").toggleClass("active");
  });
}

function anchorSmoothScroll() {
  var headerHeight = $("header").height();
  $("a[href*=\\#]").bind("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $("html, body")
      .stop()
      .animate({
          scrollTop: $(target).offset().top - (headerHeight + 30),
        },
        600
      );
    return false;
  });
}

function showpopup() {
  $(".booknow").click(function () {
    $(".overlaypopup").fadeIn();
    $(".eventpopup").fadeIn();
  });
}

function closepopup() {
  $('.closebtn').click(function () {
    $(".overlaypopup").fadeOut();
    $(".eventpopup").fadeOut();
  });
}

function submitprivateEventform() {
  $("#submitprivateEventform").click(function () {
    $(".preloader").show().fadeOut(3000);
    $(".PrivateEventForm").delay(500).fadeOut();
    $(".PrivateEventFormSubmitted").delay(1500).fadeIn();
  });
}

function submitjobapplication() {
  $("#submitjobapplication").click(function () {
    $(".loaderjobappform").show().fadeOut(3000);
    // $(".PrivateEventForm").delay(500).fadeOut();
    // $(".PrivateEventFormSubmitted").delay(1500).fadeIn();
  });
}

function loadPrivateEventForm() {
  $(".sendanotherrequest").click(function () {
    $(".PrivateEventFormSubmitted").delay(1500).fadeOut();
    $(".PrivateEventForm").delay(500).fadeIn();
  });
}

function uploadresumechangetxt() {
  $('.JobApplicationForm .resumefile').change(function () {
    var srt = $(this).val()
    $('.resumevalue').text(srt)
  });
}

function uploadCoverchangetxt() {
  $('.JobApplicationForm .coverletterfile').change(function () {
    var srt = $(this).val()
    $('.coverlettervalue').text(srt)
  });
}

function OpenCloseBurgerMenu() {
  $(".burger-menuicon").click(function () {
    $(".menu").addClass("OpenAnimation");
  });
  $(".CloseBurgerMenu").click(function () {
    $(".menu").removeClass("OpenAnimation");
  });
}

function matchHeight() {
  $(".marketandcounters .listingItem").matchHeight();
  $(".newssection .listingTitle").matchHeight();
  $(".newssection .listingInfos").matchHeight();
  $(".section2CookingClasses .listingItem").matchHeight();
  $(".section2CookingClasses .listingImage").matchHeight();
  $(".section2CookingClasses .listingInfos").matchHeight();
  $(".section2Market .listingInfos").matchHeight({
    byRow: false
  });
  $(".ourmanifesto .manifestocarousel .listingInfo").matchHeight();
  $(".ourstores .listingInfos").matchHeight();
  $(".ourstores .listingDetails").matchHeight();
  $(".ourstores .listingTitle").matchHeight();
  $(".JoinOurTeamSection .listingItem").matchHeight();
  $(".section2ContactUs .listingDetails").matchHeight({
    byRow: false
  });
  $('.section2ContactUs .listingItemLI .listingItem .listingTitle').matchHeight();
}
// function formatFooter() {
//   if ($(window).width() < 900) {
//     $('.footermenuitems2').detach().appendTo('.rowfirst');
//     $('.footermenuitems1').detach().appendTo('.rowfirst');
//     $('.openingdaysfooter').detach().appendTo('.rowsecond');
//     $('.visiteatalyarabiadiv').detach().appendTo('.rowthird');
//     $('.social-media-icons').detach().prependTo('.rowfourth');
//   } else {
//     $('.footermenuitems1').detach().appendTo('.rowfirst');
//     $('.footerlogo').detach().appendTo('.rowfirst');
//     $('.footermenuitems2').detach().appendTo('.rowfirst');
//     $('.social-media-icons').detach().appendTo('.socialmediadiv');
//     $('.visiteatalyarabiadiv').detach().appendTo('.rowsecond');
//     $('.openingdaysfooter').detach().prependTo('.rowthird');
//   }
// }

function formatcontactus() {
  if ($(window).width() > 768 && $(window).width() < 900) {
    $(".contactusform").removeClass("offset-md-4");
    $(".contactusform").removeClass("col-md-4");
    $(".contactusform").addClass("col-md-8");
    $(".contactusform").addClass("offset-md-2");
  }
}

function loadmobileCarouselRestaurant() {
  if ($(window).width() < 768) {
    $(".typesoffood .listingHolder").addClass("owl-carousel").owlCarousel({
      loop: true,
      margin: 0,
      dots: true,
      dotsData: false,
      nav: false,
      navText: ["<img class='prevbtn' src='../images/Arrowleft.png'>", "<img class='nextbtn' src='../images/Arrowright.png'>"],
      responsive: {
        0: {
          items: 1,

        }
      }
    });
  }
  $(".typesoffood .listingItem").matchHeight();
}

function dropkickfunction() {
  $('.countryselect select').dropkick({
    mobile: true
  });
  $('.storeselect select').dropkick({
    mobile: true
  });
  $('.langselect select').dropkick({
    mobile: true
  });
  $('.customSelect select').dropkick({
    mobile: true
  });
  $('.ShopOnlineStoreSelect select').dropkick();
}

function LoadCarousels() {
  $(".ourmenupics").addClass("owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: true,
    dotsData: false,
    nav: true,
    navText: ["<img class='prevbtn' src='../images/Arrowleft.png'>", "<img class='nextbtn' src='../images/Arrowright.png'>"],
    responsive: {
      0: {
        items: 1,

      }
    }
  });
  $(".privateeventcarousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: true,
    dotsData: false,
    nav: true,
    navText: ["<img class='prevbtn' src='../images/Arrowleft.png'>", "<img class='nextbtn' src='../images/Arrowright.png'>"],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });
  $(".eventssection .listingHolder").addClass("owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    center: true,
    dots: true,
    dotsData: false,
    autoWidth: true,
    nav: true,
    navText: ["<img class='prevbtn' src='../images/Arrowleft.png'>", "<img class='nextbtn' src='../images/Arrowright.png'>"],
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: true,
        center: false,
        autoWidth: true,
      },
      600: {
        items: 1,
        nav: false,
        dots: true,
      },
      1000: {
        items: 1
      }
    }
  });
  $('.restaurantpicscarousel').owlCarousel({
    loop: true,
    margin: 0,
    center: true,
    dots: true,
    dotsData: false,
    nav: true,
    navText: ["<img class='prevbtn' src='../images/Arrowleft.png'>", "<img class='nextbtn' src='../images/Arrowright.png'>"],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });
  $(".ourstores .listingHolder").addClass("owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    center: false,
    dots: false,
    dotsData: false,
    nav: true,
    autoWidth: false,
    navText: ["<img class='prevbtn' src='../images/Arrowleft.png'>", "<img class='nextbtn' src='../images/Arrowright.png'>"],
    responsive: {
      0: {
        items: 1,
        autoWidth: true,
        center: false,
        nav: false,
        margin: 0

      },
      600: {
        items: 1,
      },
      // 800: {
      //   items: 3,
      //   autoWidth: true,
      //   center: false,
      //   nav: false,
      //   margin: 0
      // },
      1000: {
        items: 3
      }
    }
  });
  $(".homeevents .listingHolder").addClass("owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    center: true,
    dots: false,
    dotsData: false,
    nav: true,
    autoWidth: true,
    navText: ["<img class='prevbtn' src='../images/Arrowleft.png'>", "<img class='nextbtn' src='../images/Arrowright.png'>"],
    responsive: {
      0: {
        items: 1,
        autoWidth: true,
        center: false,
        nav: false,
        margin: 0

      },
      600: {
        items: 1,
      },
      800: {
        items: 3,
        autoWidth: true,
        center: false,
        nav: false,
        margin: 0
      },
      1000: {
        items: 1
      }
    }
  });
  $('.manifestocarousel').owlCarousel({
    loop: true,
    margin: 24,
    nav: true,
    navText: ["<img class='prevbtn' src='../images/Arrowleft.png'>", "<img class='nextbtn' src='../images/Arrowright.png'>"],
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: true,
        center: false,
        autoWidth: true,
        margin: 15
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });
}
$(document).ready(function (e) {
  dropkickfunction();
  LoadCarousels();
  matchHeight();
  uploadresumechangetxt();
  uploadCoverchangetxt();
  loadmobileCarouselRestaurant();
  submitjobapplication();
  formatcontactus();
  OpenCloseBurgerMenu();
  submitprivateEventform();
  loadPrivateEventForm();
  showpopup();
  closepopup();
  initFunctions();
  inViewHandler();
  responsiveMenuSetup();
  responsiveMenuStateHandler();
  anchorSmoothScroll();

});

$(window).resize(function () {
  formatFooter();
  formatcontactus();
});