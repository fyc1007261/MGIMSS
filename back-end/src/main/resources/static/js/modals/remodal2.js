$('.delete_label').click(function (e) {

        // alert("here");
        var id = e.target.previousSibling.name;
        alert(id);
        var inst = $('[data-remodal-id=deleteModal]').remodal();

        inst.open();

        alert("here");

        $(document).on('confirmation', '.remodal', function () {

            $.ajax({
                type: "POST",
                async: false,
                url: "http://localhost:12333/appliance/delete_appliance",
                data: {aid: id},
                success: function (data) {
                    ret_val = data;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("！！！!");
                    alert(jqXHR);
                    alert(textStatus);
                    alert(errorThrown);
                }
            });

        });
    }
);