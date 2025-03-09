$(document).ready(function () {
    $("#showFormBtn").click(function () {
        $("#jobFormContainer").fadeIn();
        $("#showFormBtn").fadeOut();
    });

    $("#closeFormBtn").click(function () {
        $("#jobFormContainer").fadeOut();
        $("#showFormBtn").fadeIn();
    });

    $("#phone").mask("(999) 999 9999");

    $("#dob").datepicker({
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "1950:2025"
    });

    $("#jobApplicationForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 3 
            },
            surname: {
                required: true,
                minlength: 3 
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 14 
            },
            dob: {
                required: true,
                dateCheck: true 
            },
            position: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Adınızı giriniz",
                minlength: "Ad en az 3 karakter olmalıdır"
            },
            surname: {
                required: "Soyadınızı giriniz",
                minlength: "Soyad en az 3 karakter olmalıdır"
            },
            email: "Geçerli bir e-posta giriniz",
            phone: "Geçerli bir telefon numarası giriniz",
            dob: {
                required: "Doğum tarihinizi seçiniz",
                dateCheck: "Doğum tarihiniz geçerli olmalı ve 18 yaşından büyük olmalısınız"
            },
            position: "Başvurulan pozisyonu seçiniz"
        }
    });

    $.validator.addMethod("dateCheck", function (value, element) {
        var today = new Date();
        var dob = new Date(value.split("-").reverse().join("-")); 
        
        if (dob > today) {
            return false;
        }

        var age = today.getFullYear() - dob.getFullYear();
        var m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age >= 18;
    }, "Doğum tarihiniz geçerli olmalı ve 18 yaşından büyük olmalısınız");


    $("#jobApplicationForm").on("submit", function (event) {
        event.preventDefault(); 

        if ($(this).valid()) { 
            $("#successMessage").fadeIn().delay(3000).fadeOut();
            this.reset(); 
        }
    });

});
