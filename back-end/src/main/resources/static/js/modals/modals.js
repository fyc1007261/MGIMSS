// iziModal part
var modal_custom = $("#modal-custom");

modal_custom.iziModal({
    overlayClose: false,
    width: 600,
    autoOpen: false,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    onOpened: function () {
        console.log('onOpened');
    },
    onClosed: function () {
        console.log('onClosed');
    }
});

modal_custom.on('click', 'header a', function (event) {
    event.preventDefault();
    var index = $(this).index();
    $(this).addClass('active').siblings('a').removeClass('active');
    $(this).parents("div").find("section").eq(index).removeClass('hide').siblings('section').addClass('hide');

    var element = $("#modal-custom.iziModal-content.icon-close");
    if ($(this).index() === 0) {
        element.css('background', '#ddd');
    } else {
        element.attr('style', '');
    }
});
$(document).on('click', '.trigger-custom', function (event) {
    event.preventDefault();
    $('#modal-custom').iziModal('open');
});

modal_custom.on('click', '.submit', function (event) {
    event.preventDefault();
    // alert("haha");
    var fx = "wobble",  //wobble shake
        $modal = $(this).closest('.iziModal');

    var name = $("#new_app_name").val();
    var manufacture = $("#new_app_manufacture").val();
    var power = $("#new_app_power").val();
    var gesture = $("#new_app_gesture").val();
    // alert(name + manufacture + power + gesture);

    if (name === "") {
        if (!$modal.hasClass(fx)) {
            $modal.addClass(fx);
            setTimeout(function () {
                $modal.removeClass(fx);
            }, 1500);
        }
        return;
    }

    $.ajax({
        type: "POST",
        async: false,
        url: "http://localhost:12333/appliance/add_appliance",
        data: {name: name, mfrs: manufacture, power: power, gesture: gesture},
        success: function (data) {
            ret_val = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("！！！!");
            // alert(jqXHR);
            // alert(textStatus);
            // alert(errorThrown);
            if (!$modal.hasClass(fx)) {
                $modal.addClass(fx);
                setTimeout(function () {
                    $modal.removeClass(fx);
                }, 1500);
            }
        }
    });
    if (ret_val === "success") {
        {
            // alert(ret_val);
            $("#cancel-btn").click();
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }
    }
    else {
        if (!$modal.hasClass(fx)) {
            $modal.addClass(fx);
            setTimeout(function () {
                $modal.removeClass(fx);
            }, 1500);
        }
    }
});

